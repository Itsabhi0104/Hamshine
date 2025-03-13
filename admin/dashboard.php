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

// Get counts for dashboard
$database->query('SELECT COUNT(*) as total FROM quotations');
$totalQuotations = $database->single()['total'];

$database->query('SELECT COUNT(*) as total FROM quotations WHERE status = "pending"');
$pendingQuotations = $database->single()['total'];

$database->query('SELECT COUNT(*) as total FROM quotations WHERE status = "approved"');
$approvedQuotations = $database->single()['total'];

$database->query('SELECT COUNT(*) as total FROM customers');
$totalCustomers = $database->single()['total'];

$database->query('SELECT SUM(total_amount) as total FROM quotations WHERE status = "approved"');
$totalSales = $database->single()['total'] ?? 0;

// Get recent quotations
$database->query('SELECT q.*, c.name as customer_name 
                 FROM quotations q 
                 JOIN customers c ON q.customer_id = c.customer_id 
                 ORDER BY q.created_at DESC LIMIT 5');
$recentQuotations = $database->resultSet();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - <?php echo SITE_NAME; ?></title>
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
                    <h1 class="h2">Dashboard</h1>
                    <div class="btn-toolbar mb-2 mb-md-0">
                        <div class="btn-group mr-2">
                            <a href="quotations.php" class="btn btn-sm btn-outline-secondary">View All Quotations</a>
                            <a href="customers.php" class="btn btn-sm btn-outline-secondary">View All Customers</a>
                        </div>
                    </div>
                </div>
                
                <!-- Dashboard Cards -->
                <div class="row">
                    <div class="col-md-4 mb-4">
                        <div class="card bg-primary text-white h-100">
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 class="text-uppercase">Total Quotations</h6>
                                        <h1 class="display-4"><?php echo $totalQuotations; ?></h1>
                                    </div>
                                    <i class="fas fa-file-invoice fa-3x"></i>
                                </div>
                            </div>
                            <div class="card-footer d-flex align-items-center justify-content-between">
                                <a href="quotations.php" class="text-white">View Details</a>
                                <i class="fas fa-angle-right text-white"></i>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-4 mb-4">
                        <div class="card bg-warning text-white h-100">
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 class="text-uppercase">Pending Quotations</h6>
                                        <h1 class="display-4"><?php echo $pendingQuotations; ?></h1>
                                    </div>
                                    <i class="fas fa-clock fa-3x"></i>
                                </div>
                            </div>
                            <div class="card-footer d-flex align-items-center justify-content-between">
                                <a href="quotations.php?status=pending" class="text-white">View Details</a>
                                <i class="fas fa-angle-right text-white"></i>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-4 mb-4">
                        <div class="card bg-success text-white h-100">
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 class="text-uppercase">Approved Quotations</h6>
                                        <h1 class="display-4"><?php echo $approvedQuotations; ?></h1>
                                    </div>
                                    <i class="fas fa-check-circle fa-3x"></i>
                                </div>
                            </div>
                            <div class="card-footer d-flex align-items-center justify-content-between">
                                <a href="quotations.php?status=approved" class="text-white">View Details</a>
                                <i class="fas fa-angle-right text-white"></i>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-4 mb-4">
                        <div class="card bg-info text-white h-100">
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 class="text-uppercase">Total Customers</h6>
                                        <h1 class="display-4"><?php echo $totalCustomers; ?></h1>
                                    </div>
                                    <i class="fas fa-users fa-3x"></i>
                                </div>
                            </div>
                            <div class="card-footer d-flex align-items-center justify-content-between">
                                <a href="customers.php" class="text-white">View Details</a>
                                <i class="fas fa-angle-right text-white"></i>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-8 mb-4">
                        <div class="card bg-dark text-white h-100">
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 class="text-uppercase">Total Sales (Approved Quotations)</h6>
                                        <h1 class="display-4">$<?php echo number_format($totalSales, 2); ?></h1>
                                    </div>
                                    <i class="fas fa-dollar-sign fa-3x"></i>
                                </div>
                            </div>
                            <div class="card-footer d-flex align-items-center justify-content-between">
                                <a href="reports.php" class="text-white">View Reports</a>
                                <i class="fas fa-angle-right text-white"></i>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Recent Quotations -->
                <div class="card mb-4">
                    <div class="card-header">
                        <i class="fas fa-table mr-1"></i>
                        Recent Quotations
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>Quotation #</th>
                                        <th>Customer</th>
                                        <th>Date</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php if (empty($recentQuotations)): ?>
                                        <tr>
                                            <td colspan="6" class="text-center">No quotations found</td>
                                        </tr>
                                    <?php else: ?>
                                        <?php foreach ($recentQuotations as $quotation): ?>
                                            <tr>
                                                <td><?php echo $quotation['quotation_number']; ?></td>
                                                <td><?php echo $quotation['customer_name']; ?></td>
                                                <td><?php echo date('M d, Y', strtotime($quotation['created_at'])); ?></td>
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
                                                    <a href="view_quotation.php?id=<?php echo $quotation['quotation_id']; ?>" class="btn btn-sm btn-info">
                                                        <i class="fas fa-eye"></i>
                                                    </a>
                                                    <a href="../generate_pdf.php?id=<?php echo $quotation['quotation_id']; ?>" class="btn btn-sm btn-secondary" target="_blank">
                                                        <i class="fas fa-file-pdf"></i>
                                                    </a>
                                                </td>
                                            </tr>
                                        <?php endforeach; ?>
                                    <?php endif; ?>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="card-footer small text-muted">
                        <a href="quotations.php" class="btn btn-primary btn-sm">View All Quotations</a>
                    </div>
                </div>
            </main>
        </div>
    </div>
    
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script src="../assets/js/admin.js"></script>
</body>
</html>

