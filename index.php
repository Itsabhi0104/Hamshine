<?php
require_once 'config/database.php';

// Create database instance
$database = new Database();

// Get all active products
$database->query('SELECT * FROM products WHERE is_active = 1 ORDER BY category, name');
$products = $database->resultSet();

// Group products by category
$productsByCategory = [];
foreach ($products as $product) {
    $category = $product['category'];
    if (!isset($productsByCategory[$category])) {
        $productsByCategory[$category] = [];
    }
    $productsByCategory[$category][] = $product;
}

// Process form submission
$success = false;
$error = '';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    try {
        // Start transaction
        $database->beginTransaction();
        
        // 1. Save customer information
        $database->query('INSERT INTO customers (name, email, phone, address, city, state, zip_code) 
                         VALUES (:name, :email, :phone, :address, :city, :state, :zip_code)');
        $database->bind(':name', $_POST['customer_name']);
        $database->bind(':email', $_POST['customer_email']);
        $database->bind(':phone', $_POST['customer_phone']);
        $database->bind(':address', $_POST['customer_address']);
        $database->bind(':city', $_POST['customer_city']);
        $database->bind(':state', $_POST['customer_state']);
        $database->bind(':zip_code', $_POST['customer_zip']);
        $database->execute();
        
        $customerId = $database->lastInsertId();
        
        // 2. Create quotation
        $quotationNumber = QUOTE_PREFIX . date('Ymd') . '-' . sprintf('%04d', rand(1, 9999));
        $expiryDate = date('Y-m-d', strtotime('+' . QUOTE_EXPIRY_DAYS . ' days'));
        
        $database->query('INSERT INTO quotations (customer_id, quotation_number, subtotal, discount_percentage, 
                         discount_amount, tax_rate, tax_amount, shipping_cost, total_amount, notes, expiry_date) 
                         VALUES (:customer_id, :quotation_number, :subtotal, :discount_percentage, 
                         :discount_amount, :tax_rate, :tax_amount, :shipping_cost, :total_amount, :notes, :expiry_date)');
        $database->bind(':customer_id', $customerId);
        $database->bind(':quotation_number', $quotationNumber);
        $database->bind(':subtotal', $_POST['subtotal']);
        $database->bind(':discount_percentage', $_POST['discount_percentage']);
        $database->bind(':discount_amount', $_POST['discount_amount']);
        $database->bind(':tax_rate', $_POST['tax_rate']);
        $database->bind(':tax_amount', $_POST['tax_amount']);
        $database->bind(':shipping_cost', $_POST['shipping_cost']);
        $database->bind(':total_amount', $_POST['total_amount']);
        $database->bind(':notes', $_POST['notes']);
        $database->bind(':expiry_date', $expiryDate);
        $database->execute();
        
        $quotationId = $database->lastInsertId();
        
        // 3. Save quotation items
        $productIds = $_POST['product_id'];
        $quantities = $_POST['quantity'];
        $unitPrices = $_POST['unit_price'];
        $totalPrices = $_POST['item_total'];
        
        for ($i = 0; $i < count($productIds); $i++) {
            if (!empty($productIds[$i]) && $quantities[$i] > 0) {
                $database->query('INSERT INTO quotation_items (quotation_id, product_id, quantity, unit_price, total_price) 
                                 VALUES (:quotation_id, :product_id, :quantity, :unit_price, :total_price)');
                $database->bind(':quotation_id', $quotationId);
                $database->bind(':product_id', $productIds[$i]);
                $database->bind(':quantity', $quantities[$i]);
                $database->bind(':unit_price', $unitPrices[$i]);
                $database->bind(':total_price', $totalPrices[$i]);
                $database->execute();
            }
        }
        
        // Commit transaction
        $database->endTransaction();
        
        // Generate PDF and send email
        header("Location: generate_pdf.php?id=" . $quotationId);
        exit();
        
    } catch (Exception $e) {
        // Rollback transaction on error
        $database->cancelTransaction();
        $error = "Error creating quotation: " . $e->getMessage();
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Solar Quotation System</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
            <a class="navbar-brand" href="index.php">
                <img src="<?php echo COMPANY_LOGO; ?>" alt="<?php echo COMPANY_NAME; ?>" height="40">
                <?php echo COMPANY_NAME; ?>
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="index.php">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="auth/login.php">Admin Login</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="container mt-4">
        <div class="jumbotron">
            <h1 class="display-4">Solar Quotation System</h1>
            <p class="lead">Get an instant quote for your solar energy needs. Fill out the form below to generate a detailed quotation.</p>
        </div>
        
        <?php if (!empty($error)): ?>
            <div class="alert alert-danger"><?php echo $error; ?></div>
        <?php endif; ?>
        
        <?php if ($success): ?>
            <div class="alert alert-success">
                <h4>Quotation Created Successfully!</h4>
                <p>Your quotation has been created and sent to your email. You can also download it using the link below.</p>
                <a href="download.php?id=<?php echo $quotationId; ?>" class="btn btn-primary">Download Quotation</a>
            </div>
        <?php else: ?>
            <form id="quotationForm" method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">
                <div class="card mb-4">
                    <div class="card-header bg-primary text-white">
                        <h4 class="mb-0">Customer Information</h4>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="customer_name">Full Name *</label>
                                    <input type="text" class="form-control" id="customer_name" name="customer_name" required>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="customer_email">Email Address *</label>
                                    <input type="email" class="form-control" id="customer_email" name="customer_email" required>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="customer_phone">Phone Number *</label>
                                    <input type="tel" class="form-control" id="customer_phone" name="customer_phone" required>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="customer_address">Address *</label>
                                    <input type="text" class="form-control" id="customer_address" name="customer_address" required>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="customer_city">City *</label>
                                    <input type="text" class="form-control" id="customer_city" name="customer_city" required>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="customer_state">State *</label>
                                    <input type="text" class="form-control" id="customer_state" name="customer_state" required>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="customer_zip">ZIP Code *</label>
                                    <input type="text" class="form-control" id="customer_zip" name="customer_zip" required>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="card mb-4">
                    <div class="card-header bg-primary text-white">
                        <h4 class="mb-0">Product Selection</h4>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered" id="productTable">
                                <thead class="thead-light">
                                    <tr>
                                        <th>Product</th>
                                        <th width="120">Quantity</th>
                                        <th width="150">Unit Price ($)</th>
                                        <th width="150">Total ($)</th>
                                        <th width="50">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="product-row">
                                        <td>
                                            <select class="form-control product-select" name="product_id[]" required>
                                                <option value="">Select a product</option>
                                                <?php foreach ($productsByCategory as $category => $categoryProducts): ?>
                                                    <optgroup label="<?php echo $category; ?>">
                                                        <?php foreach ($categoryProducts as $product): ?>
                                                            <option value="<?php echo $product['product_id']; ?>" data-price="<?php echo $product['price']; ?>">
                                                                <?php echo $product['name']; ?> ($<?php echo number_format($product['price'], 2); ?>)
                                                            </option>
                                                        <?php endforeach; ?>
                                                    </optgroup>
                                                <?php endforeach; ?>
                                            </select>
                                        </td>
                                        <td>
                                            <input type="number" class="form-control quantity" name="quantity[]" min="1" value="1" required>
                                        </td>
                                        <td>
                                            <input type="number" class="form-control unit-price" name="unit_price[]" step="0.01" readonly>
                                        </td>
                                        <td>
                                            <input type="number" class="form-control item-total" name="item_total[]" step="0.01" readonly>
                                        </td>
                                        <td>
                                            <button type="button" class="btn btn-danger btn-sm remove-row"><i class="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colspan="5">
                                            <button type="button" class="btn btn-success btn-sm" id="addProductBtn">
                                                <i class="fas fa-plus"></i> Add Product
                                            </button>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
                
                <div class="card mb-4">
                    <div class="card-header bg-primary text-white">
                        <h4 class="mb-0">Quotation Summary</h4>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="notes">Notes</label>
                                    <textarea class="form-control" id="notes" name="notes" rows="5" placeholder="Enter any additional notes or special requirements"></textarea>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="table-responsive">
                                    <table class="table table-bordered">
                                        <tbody>
                                            <tr>
                                                <th>Subtotal:</th>
                                                <td>
                                                    <div class="input-group">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text">$</span>
                                                        </div>
                                                        <input type="number" class="form-control" id="subtotal" name="subtotal" step="0.01" readonly>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Discount (%):</th>
                                                <td>
                                                    <div class="input-group">
                                                        <input type="number" class="form-control" id="discount_percentage" name="discount_percentage" min="0" max="100" step="0.01" value="0">
                                                        <div class="input-group-append">
                                                            <span class="input-group-text">%</span>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Discount Amount:</th>
                                                <td>
                                                    <div class="input-group">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text">$</span>
                                                        </div>
                                                        <input type="number" class="form-control" id="discount_amount" name="discount_amount" step="0.01" readonly>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Tax Rate (%):</th>
                                                <td>
                                                    <div class="input-group">
                                                        <input type="number" class="form-control" id="tax_rate" name="tax_rate" min="0" step="0.01" value="7.5">
                                                        <div class="input-group-append">
                                                            <span class="input-group-text">%</span>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Tax Amount:</th>
                                                <td>
                                                    <div class="input-group">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text">$</span>
                                                        </div>
                                                        <input type="number" class="form-control" id="tax_amount" name="tax_amount" step="0.01" readonly>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Shipping Cost:</th>
                                                <td>
                                                    <div class="input-group">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text">$</span>
                                                        </div>
                                                        <input type="number" class="form-control" id="shipping_cost" name="shipping_cost" min="0" step="0.01" value="0">
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr class="table-primary">
                                                <th>Total Amount:</th>
                                                <td>
                                                    <div class="input-group">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text">$</span>
                                                        </div>
                                                        <input type="number" class="form-control" id="total_amount" name="total_amount" step="0.01" readonly>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="text-center mb-5">
                    <button type="submit" class="btn btn-primary btn-lg">Generate Quotation</button>
                </div>
            </form>
        <?php endif; ?>
    </div>
    
    <footer class="bg-dark text-white py-4 mt-5">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <h5><?php echo COMPANY_NAME; ?></h5>
                    <p><?php echo COMPANY_ADDRESS; ?><br>
                    Phone: <?php echo COMPANY_PHONE; ?><br>
                    Email: <?php echo COMPANY_EMAIL; ?></p>
                </div>
                <div class="col-md-6 text-md-right">
                    <p>&copy; <?php echo date('Y'); ?> <?php echo COMPANY_NAME; ?>. All rights reserved.</p>
                </div>
            </div>
        </div>
    </footer>

    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script>
        $(document).ready(function() {
            // Add new product row
            $('#addProductBtn').click(function() {
                var newRow = $('.product-row:first').clone();
                newRow.find('input').val('');
                newRow.find('select').val('');
                newRow.find('.quantity').val(1);
                $('#productTable tbody').append(newRow);
                updateCalculations();
            });
            
            // Remove product row
            $(document).on('click', '.remove-row', function() {
                if ($('.product-row').length > 1) {
                    $(this).closest('tr').remove();
                    updateCalculations();
                } else {
                    alert('You cannot remove the last product row.');
                }
            });
            
            // Update price when product is selected
            $(document).on('change', '.product-select', function() {
                var row = $(this).closest('tr');
                var price = $(this).find(':selected').data('price') || 0;
                row.find('.unit-price').val(price.toFixed(2));
                updateRowTotal(row);
            });
            
            // Update total when quantity changes
            $(document).on('change', '.quantity', function() {
                var row = $(this).closest('tr');
                updateRowTotal(row);
            });
            
            // Update calculations when discount, tax, or shipping changes
            $('#discount_percentage, #tax_rate, #shipping_cost').on('change', function() {
                updateCalculations();
            });
            
            // Calculate row total
            function updateRowTotal(row) {
                var quantity = parseFloat(row.find('.quantity').val()) || 0;
                var unitPrice = parseFloat(row.find('.unit-price').val()) || 0;
                var total = quantity * unitPrice;
                row.find('.item-total').val(total.toFixed(2));
                updateCalculations();
            }
            
            // Update all calculations
            function updateCalculations() {
                // Calculate subtotal
                var subtotal = 0;
                $('.item-total').each(function() {
                    subtotal += parseFloat($(this).val()) || 0;
                });
                $('#subtotal').val(subtotal.toFixed(2));
                
                // Calculate discount
                var discountPercentage = parseFloat($('#discount_percentage').val()) || 0;
                var discountAmount = subtotal * (discountPercentage / 100);
                $('#discount_amount').val(discountAmount.toFixed(2));
                
                // Calculate tax
                var taxableAmount = subtotal - discountAmount;
                var taxRate = parseFloat($('#tax_rate').val()) || 0;
                var taxAmount = taxableAmount * (taxRate / 100);
                $('#tax_amount').val(taxAmount.toFixed(2));
                
                // Calculate total
                var shippingCost = parseFloat($('#shipping_cost').val()) || 0;
                var totalAmount = taxableAmount + taxAmount + shippingCost;
                $('#total_amount').val(totalAmount.toFixed(2));
            }
            
            // Initialize calculations
            updateCalculations();
        });
    </script>
</body>
</html>

