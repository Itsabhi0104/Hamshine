<?php
session_start();
require_once '../config/database.php';

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    header('Location: ../auth/login.php');
    exit();
}

// Create database instance
$database = new Database();

// Handle status update
if (isset($_POST['update_status'])) {
    $quotationId = $_POST['quotation_id'];
    $newStatus = $_POST['status'];
    
    $database->query('UPDATE quotations SET status = :status WHERE quotation_id = :quotation_id');
    $database->bind(':status', $newStatus);
    $database->bind(':quotation_id', $quotationId);
    
    if ($database->execute()) {
        $statusMessage = "Quotation status updated successfully";
    } else {
        $statusError = "Failed to update quotation status";
    }
}

// Handle delete
if (isset($_POST['delete_quotation'])) {
    $quotationId = $_POST['quotation_id'];
    
    $database->query('DELETE FROM quotations WHERE quotation_id = :quotation_id');
    $database->bind(':quotation_id', $quotationId);
    
    if ($database->execute()) {
        $deleteMessage = "Quotation deleted successfully";
    } else {
        $deleteError = "Failed to delete quotation";
    }
}

// Set up filtering
$whereClause = '';
$params = [];

// Status filter
if (isset($_GET['status']) && in_array($_GET['status'], ['pending', 'approved', 'declined'])) {
    $whereClause .= ' AND q.status = :status';
    $params[':status'] = $_GET['status'];
}

// Search filter
if (isset($_GET['search']) && !empty($_GET['search'])) {
    $search = $_GET['search'];
    $whereClause .= ' AND (q.quotation_number LIKE :search OR c.name LIKE :search OR c.email LIKE :search)';
    $params[':search'] = "%$search%";
}

// Date range filter
if (isset($_GET['start_date']) && !empty($_GET['start_date'])) {
    $whereClause .= ' AND DATE(q.created_at) >= :start_date';
    $params[':start_date'] = $_GET['start_date'];
}

if (isset($_GET['end_date']) && !empty($_GET['end_date'])) {
    $whereClause .= ' AND DATE(q.created_at) <= :end_date';
    $params[':end_date'] = $_GET['end_date'];
}

// Pagination
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = 10;
$offset = ($page - 1) * $limit;

// Get total count for pagination
$countQuery = 'SELECT COUNT(*) as total FROM quotations q JOIN customers c ON q.customer_id = c.customer_id WHERE 1=1' . $whereClause;
$database->query($countQuery);
foreach ($params as $param => $value) {
    $database->bind($param, $value);
}
$totalCount = $database->single()['total'];
$totalPages = ceil($totalCount / $limit);

// Get quotations
$query = 'SELECT q.*, c.name as customer_name, c.email as customer_email 
          FROM quotations q 
          JOIN customers c ON q.customer_id = c.customer_id 
          WHERE 1=1' . $whereClause . ' 
          ORDER BY q.created_at DESC 
          LIMIT :limit OFFSET :offset';

$database->query($query);
foreach ($params as $param => $value) {
    $database->bind($param, $value);
}
$database->bind(':limit', $limit, PDO::PARAM_INT);
$database->bind(':offset', $offset, PDO::PARAM_INT);
$quotations = $database->resultSet();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manage Quotations - <?php echo SITE_NAME; ?></title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">
    <link rel="stylesheet" href="../assets/css/admin.css">
</head>
<body>
    <?php include 'includes/header.php'; ?>
    
    <div class="container-fluid">
        <div class="row">
            <?php include 'includes/sidebar.php'; ?>
            
            <main class="col-md-9 ml-sm-auto col-lg-10 px-md-4 py-4">
                <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 class="h2">Manage Quotations</h1>
                    <div class="btn-toolbar mb-2 mb-md-0">
                        <a href="../index.php" class="btn btn-sm btn-outline-primary mr-2">
                            <i class="fas fa-plus"></i> Create New Quotation
                        </a>
                        <button type="button" class="btn btn-sm btn-outline-secondary" data-toggle="modal" data-target="#filterModal">
                            <i class="fas fa-filter"></i> Filter
                        </button>
                    </div>
                </div>
                
                <?php if (isset($statusMessage)): ?>
                    <div class="alert alert-success"><?php echo $statusMessage; ?></div>
                <?php endif; ?>
                
                <?php if (isset($statusError)): ?>
                    <div class="alert alert-danger"><?php echo $statusError; ?></div>
                <?php endif; ?>
                
                <?php if (isset($deleteMessage)): ?>
                    <div class="alert alert-success"><?php echo $deleteMessage; ?></div>
                <?php endif; ?>
                
                <?php if (isset($deleteError)): ?>
                    <div class="alert alert-danger"><?php echo $deleteError; ?></div>
                <?php endif; ?>
                
                <!-- Search Form -->
                <div class="card mb-4">
                    <div class="card-body">
                        <form method="get" action="<?php echo $_SERVER['PHP_SELF']; ?>" class="form-inline">
                            <div class="form-group mb-2">
                                <input type="text" name="search" class="form-control" placeholder="Search..." value="<?php echo isset($_GET['search']) ? $_GET['search'] : ''; ?>">
                            </div>
                            <button type="submit" class="btn btn-primary mb-2 ml-2">Search</button>
                            <a href="quotations.php" class="btn btn-secondary mb-2 ml-2">Reset</a>
                            
                            <?php if (isset($_GET['status'])): ?>
                                <input type="hidden" name="status" value="<?php echo $_GET['status']; ?>">
                            <?php endif; ?>
                            
                            <?php if (isset($_GET['start_date'])): ?>
                                <input type="hidden" name="start_date" value="<?php echo $_GET['start_date']; ?>">
                            <?php endif; ?>
                            
                            <?php if (isset($_GET['end_date'])): ?>
                                <input type="hidden" name="end_date" value="<?php echo $_GET['end_date']; ?>">
                            <?php endif; ?>
                        </form>
                    </div>
                </div>
                
                <!-- Status Tabs -->
                <ul class="nav nav-tabs mb-4">
                    <li class="nav-item">
                        <a class="nav-link <?php echo !isset($_GET['status']) ? 'active' : ''; ?>" href="quotations.php">All</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link <?php echo (isset($_GET['status']) && $_GET['status'] == 'pending') ? 'active' : ''; ?>" href="quotations.php?status=pending">Pending</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link <?php echo (isset($_GET['status']) && $_GET['status'] == 'approved') ? 'active' : ''; ?>" href="quotations.php?status=approved">Approved</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link <?php echo (isset($_GET['status']) && $_GET['status'] == 'declined') ? 'active' : ''; ?>" href="quotations.php?status=declined">Declined</a>
                    </li>
                </ul>
                
                <!-- Quotations Table -->
                <div class="card mb-4">
                    <div class="card-header">
                        <i class="fas fa-table mr-1"></i>
                        Quotations
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>Quotation #</th>
                                        <th>Customer</th>
                                        <th>Date</th>
                                        <th>Expiry Date</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php if (empty($quotations)): ?>
                                        <tr>
                                            <td colspan="7" class="text-center">No quotations found</td>
                                        </tr>
                                    <?php else: ?>
                                        <?php foreach ($quotations as $quotation): ?>
                                            <tr>
                                                <td><?php echo $quotation['quotation_number']; ?></td>
                                                <td>
                                                    <?php echo $quotation['customer_name']; ?><br>
                                                    <small class="text-muted"><?php echo $quotation['customer_email']; ?></small>
                                                </td>
                                                <td><?php echo date('M d, Y', strtotime($quotation['created_at'])); ?></td>
                                                <td>
                                                    <?php 
                                                    $expiryDate = strtotime($quotation['expiry_date']);
                                                    $today = time();
                                                    $expired = $expiryDate < $today;
                                                    
                                                    echo date('M d, Y', $expiryDate);
                                                    
                                                    if ($expired && $quotation['status'] == 'pending') {
                                                        echo '<br><span class="badge badge-danger">Expired</span>';
                                                    }
                                                    ?>
                                                </td>
                                                <td>$<?php echo number_format($quotation['total_amount'], 2); ?></td>
                                                <td>
                                                    <?php if ($quotation['status'] == 'pending'): ?>
                                                        <span class="badge badge-warning">Pending</span>
                                                    <?php elseif ($quotation['status'] == 'approved'): ?>
                                                        <span class="badge badge-success">Approved</span>
                                                    <?php else: ?>
                                                        <span class="badge badge-danger">Declined</span>
                                                    <?php endif; ?>
                                                </td>
                                                <td>
                                                    <div class="btn-group">
                                                        <a href="view_quotation.php?id=<?php echo $quotation['quotation_id']; ?>" class="btn btn-sm btn-info">
                                                            <i class="fas fa-eye"></i>
                                                        </a>
                                                        <a href="../generate_pdf.php?id=<?php echo $quotation['quotation_id']; ?>" class="btn btn-sm btn-secondary" target="_blank">
                                                            <i class="fas fa-file-pdf"></i>
                                                        </a>
                                                        <button type="button" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#statusModal<?php echo $quotation['quotation_id']; ?>">
                                                            <i class="fas fa-edit"></i>
                                                        </button>
                                                        <button type="button" class="btn btn-sm btn-danger" data-toggle="modal" data-target="#deleteModal<?php echo $quotation['quotation_id']; ?>">
                                                            <i class="fas fa-trash"></i>
                                                        </button>
                                                    </div>
                                                    
                                                    <!-- Status Modal -->
                                                    <div class="modal fade" id="statusModal<?php echo $quotation['quotation_id']; ?>" tabindex="-1" role="dialog" aria-labelledby="statusModalLabel" aria-hidden="true">
                                                        <div class="modal-dialog" role="document">
                                                            <div class="modal-content">
                                                                <div class="modal-header">
                                                                    <h5 class="modal-title" id="statusModalLabel">Update Quotation Status</h5>
                                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                        <span aria-hidden="true">&times;</span>
                                                                    </button>
                                                                </div>
                                                                <form method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">
                                                                    <div class="modal-body">
                                                                        <input type="hidden" name="quotation_id" value="<?php echo $quotation['quotation_id']; ?>">
                                                                        <div class="form-group">
                                                                            <label for="status">Status</label>
                                                                            <select class="form-control" id="status" name="status">
                                                                                <option value="pending" <?php echo $quotation['status'] == 'pending' ? 'selected' : ''; ?>>Pending</option>
                                                                                <option value="approved" <?php echo $quotation['status'] == 'approved' ? 'selected' : ''; ?>>Approved</option>
                                                                                <option value="declined" <?php echo $quotation['status'] == 'declined' ? 'selected' : ''; ?>>Declined</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                    <div class="modal-footer">
                                                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                                        <button type="submit" name="update_status" class="btn btn-primary">Update Status</button>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <!-- Delete Modal -->
                                                    <div class="modal fade" id="deleteModal<?php echo $quotation['quotation_id']; ?>" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
                                                        <div class="modal-dialog" role="document">
                                                            <div class="modal-content">
                                                                <div class="modal-header">
                                                                    <h5 class="modal-title" id="deleteModalLabel">Confirm Delete</h5>
                                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                        <span aria-hidden="true">&times;</span>
                                                                    </button>
                                                                </div>
                                                                <div class="modal-body">
                                                                    Are you sure you want to delete quotation #<?php echo $quotation['quotation_number']; ?>?
                                                                </div>
                                                                <div class="modal-footer">
                                                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                                                    <form method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">
                                                                        <input type="hidden" name="quotation_id" value="<?php echo $quotation['quotation_id']; ?>">
                                                                        <button type="submit" name="delete_quotation" class="btn btn-danger">Delete</button>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        <?php endforeach; ?>
                                    <?php endif; ?>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="card-footer">
                        <!-- Pagination -->
                        <?php if ($totalPages > 1): ?>
                            <nav>
                                <ul class="pagination justify-content-center">
                                    <?php if ($page > 1): ?>
                                        <li class="page-item">
                                            <a class="page-link" href="?page=<?php echo $page - 1; ?><?php echo isset($_GET['status']) ? '&status=' . $_GET['status'] : ''; ?><?php echo isset($_GET['search']) ? '&search=' . $_GET['search'] : ''; ?><?php echo isset($_GET['start_date']) ? '&start_date=' . $_GET['start_date'] : ''; ?><?php echo isset($_GET['end_date']) ? '&end_date=' . $_GET['end_date'] : ''; ?>">Previous</a>
                                        </li>
                                    <?php endif; ?>
                                    
                                    <?php for ($i = 1; $i <= $totalPages; $i++): ?>
                                        <li class="page-item <?php echo $i == $page ? 'active' : ''; ?>">
                                            <a class="page-link" href="?page=<?php echo $i; ?><?php echo isset($_GET['status']) ? '&status=' . $_GET['status'] : ''; ?><?php echo isset($_GET['search']) ? '&search=' . $_GET['search'] : ''; ?><?php echo isset($_GET['start_date']) ? '&start_date=' . $_GET['start_date'] : ''; ?><?php echo isset($_GET['end_date']) ? '&end_date=' . $_GET['end_date'] : ''; ?>"><?php echo $i; ?></a>
                                        </li>
                                    <?php endfor; ?>
                                    
                                    <?php if ($page < $totalPages): ?>
                                        <li class="page-item">
                                            <a class="page-link" href="?page=<?php echo $page + 1; ?><?php echo isset($_GET['status']) ? '&status=' . $_GET['status'] : ''; ?><?php echo isset($_GET['search']) ? '&search=' . $_GET['search'] : ''; ?><?php echo isset($_GET['start_date']) ? '&start_date=' . $_GET['start_date'] : ''; ?><?php echo isset($_GET['end_date']) ? '&end_date=' . $_GET['end_date'] : ''; ?>">Next</a>
                                        </li>
                                    <?php endif; ?>
                                </ul>
                            </nav>
                        <?php endif; ?>
                    </div>
                </div>
            </main>
        </div>
    </div>
    
    <!-- Filter Modal -->
    <div class="modal fade" id="filterModal" tabindex="-1" role="dialog" aria-labelledby="filterModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="filterModalLabel">Filter Quotations</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form method="get" action="<?php echo $_SERVER['PHP_SELF']; ?>">
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="status">Status</label>
                            <select class="form-control" id="status" name="status">
                                <option value="">All</option>
                                <option value="pending" <?php echo (isset($_GET['status']) && $_GET['status'] == 'pending') ? 'selected' : ''; ?>>Pending</option>
                                <option value="approved" <?php echo (isset($_GET['status']) && $_GET['status'] == 'approved') ? 'selected' : ''; ?>>Approved</option>
                                <option value="declined" <?php echo (isset($_GET['status']) && $_GET['status'] == 'declined') ? 'selected' : ''; ?>>Declined</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="start_date">Start Date</label>
                            <input type="date" class="form-control" id="start_date" name="start_date" value="<?php echo isset($_GET['start_date']) ? $_GET['start_date'] : ''; ?>">
                        </div>
                        <div class="form-group">
                            <label for="end_date">End Date</label>
                            <input type="date" class="form-control" id="end_date" name="end_date" value="<?php echo isset($_GET['end_date']) ? $_GET['end_date'] : ''; ?>">
                        </div>
                        <div class="form-group">
                            <label for="search">Search</label>
                            <input type="text" class="form-control" id="search" name="search" placeholder="Search by quotation number or customer" value="<?php echo isset($_GET['search']) ? $_GET['search'] : ''; ?>">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <a href="quotations.php" class="btn btn-warning">Reset</a>
                        <button type="submit" class="btn btn-primary">Apply Filters</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script src="../assets/js/admin.js"></script>
</body>
</html>

