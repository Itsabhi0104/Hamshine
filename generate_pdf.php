<?php
require_once 'config/database.php';
require_once 'vendor/autoload.php'; // Require TCPDF library

// Check if quotation ID is provided
if (!isset($_GET['id']) || empty($_GET['id'])) {
    die('Quotation ID is required');
}

$quotationId = $_GET['id'];

// Create database instance
$database = new Database();

// Get quotation details
$database->query('SELECT q.*, c.* FROM quotations q 
                 JOIN customers c ON q.customer_id = c.customer_id 
                 WHERE q.quotation_id = :quotation_id');
$database->bind(':quotation_id', $quotationId);
$quotation = $database->single();

if (!$quotation) {
    die('Quotation not found');
}

// Get quotation items
$database->query('SELECT qi.*, p.name as product_name, p.description as product_description, p.unit 
                 FROM quotation_items qi 
                 JOIN products p ON qi.product_id = p.product_id 
                 WHERE qi.quotation_id = :quotation_id');
$database->bind(':quotation_id', $quotationId);
$items = $database->resultSet();

// Create new PDF document
$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

// Set document information
$pdf->SetCreator(COMPANY_NAME);
$pdf->SetAuthor(COMPANY_NAME);
$pdf->SetTitle('Quotation #' . $quotation['quotation_number']);
$pdf->SetSubject('Solar System Quotation');
$pdf->SetKeywords('Quotation, Solar, Energy');

// Remove header and footer
$pdf->setPrintHeader(false);
$pdf->setPrintFooter(false);

// Set default monospaced font
$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

// Set margins
$pdf->SetMargins(15, 15, 15);

// Set auto page breaks
$pdf->SetAutoPageBreak(TRUE, 15);

// Set image scale factor
$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

// Set font
$pdf->SetFont('helvetica', '', 10);

// Add a page
$pdf->AddPage();

// Company logo and information
$pdf->Image(COMPANY_LOGO, 15, 15, 30, 0, '', '', 'T', false, 300, '', false, false, 0, false, false, false);
$pdf->SetFont('helvetica', 'B', 14);
$pdf->SetXY(50, 15);
$pdf->Cell(0, 10, COMPANY_NAME, 0, 1, 'L');
$pdf->SetFont('helvetica', '', 10);
$pdf->SetXY(50, 25);
$pdf->MultiCell(0, 5, COMPANY_ADDRESS . "\nPhone: " . COMPANY_PHONE . "\nEmail: " . COMPANY_EMAIL . "\nWebsite: " . COMPANY_WEBSITE, 0, 'L', 0, 1, '', '', true);

// Quotation title and number
$pdf->SetFont('helvetica', 'B', 16);
$pdf->Cell(0, 15, 'QUOTATION', 0, 1, 'C');
$pdf->SetFont('helvetica', 'B', 12);
$pdf->Cell(0, 10, 'Quotation #: ' . $quotation['quotation_number'], 0, 1, 'R');
$pdf->SetFont('helvetica', '', 10);
$pdf->Cell(0, 5, 'Date: ' . date('F d, Y', strtotime($quotation['created_at'])), 0, 1, 'R');
$pdf->Cell(0, 5, 'Valid Until: ' . date('F d, Y', strtotime($quotation['expiry_date'])), 0, 1, 'R');

// Customer information
$pdf->SetFont('helvetica', 'B', 12);
$pdf->Cell(0, 10, 'Customer Information:', 0, 1, 'L');
$pdf->SetFont('helvetica', '', 10);
$pdf->MultiCell(0, 5, 'Name: ' . $quotation['name'] . "\nEmail: " . $quotation['email'] . "\nPhone: " . $quotation['phone'] . "\nAddress: " . $quotation['address'] . ", " . $quotation['city'] . ", " . $quotation['state'] . " " . $quotation['zip_code'], 0, 'L', 0, 1, '', '', true);

// Items table
$pdf->Ln(5);
$pdf->SetFont('helvetica', 'B', 12);
$pdf->Cell(0, 10, 'Quotation Details:', 0, 1, 'L');

// Table header
$pdf->SetFont('helvetica', 'B', 10);
$pdf->SetFillColor(240, 240, 240);
$pdf->Cell(10, 7, '#', 1, 0, 'C', 1);
$pdf->Cell(80, 7, 'Product', 1, 0, 'L', 1);
$pdf->Cell(25, 7, 'Quantity', 1, 0, 'C', 1);
$pdf->Cell(30, 7, 'Unit Price', 1, 0, 'R', 1);
$pdf->Cell(30, 7, 'Total', 1, 1, 'R', 1);

// Table content
$pdf->SetFont('helvetica', '', 10);
$i = 1;
foreach ($items as $item) {
    $pdf->Cell(10, 7, $i, 1, 0, 'C');
    $pdf->Cell(80, 7, $item['product_name'], 1, 0, 'L');
    $pdf->Cell(25, 7, $item['quantity'] . ' ' . $item['unit'], 1, 0, 'C');
    $pdf->Cell(30, 7, '$' . number_format($item['unit_price'], 2), 1, 0, 'R');
    $pdf->Cell(30, 7, '$' . number_format($item['total_price'], 2), 1, 1, 'R');
    $i++;
}

// Summary
$pdf->Ln(5);
$pdf->SetFont('helvetica', 'B', 10);
$pdf->Cell(115, 7, '', 0, 0);
$pdf->Cell(30, 7, 'Subtotal:', 1, 0, 'L', 1);
$pdf->SetFont('helvetica', '', 10);
$pdf->Cell(30, 7, '$' . number_format($quotation['subtotal'], 2), 1, 1, 'R');

$pdf->SetFont('helvetica', 'B', 10);
$pdf->Cell(115, 7, '', 0, 0);
$pdf->Cell(30, 7, 'Discount (' . number_format($quotation['discount_percentage'], 2) . '%):', 1, 0, 'L', 1);
$pdf->SetFont('helvetica', '', 10);
$pdf->Cell(30, 7, '$' . number_format($quotation['discount_amount'], 2), 1, 1, 'R');

$pdf->SetFont('helvetica', 'B', 10);
$pdf->Cell(115, 7, '', 0, 0);
$pdf->Cell(30, 7, 'Tax (' . number_format($quotation['tax_rate'], 2) . '%):', 1, 0, 'L', 1);
$pdf->SetFont('helvetica', '', 10);
$pdf->Cell(30, 7, '$' . number_format($quotation['tax_amount'], 2), 1, 1, 'R');

$pdf->SetFont('helvetica', 'B', 10);
$pdf->Cell(115, 7, '', 0, 0);
$pdf->Cell(30, 7, 'Shipping:', 1, 0, 'L', 1);
$pdf->SetFont('helvetica', '', 10);
$pdf->Cell(30, 7, '$' . number_format($quotation['shipping_cost'], 2), 1, 1, 'R');

$pdf->SetFont('helvetica', 'B', 12);
$pdf->Cell(115, 7, '', 0, 0);
$pdf->Cell(30, 7, 'TOTAL:', 1, 0, 'L', 1);
$pdf->Cell(30, 7, '$' . number_format($quotation['total_amount'], 2), 1, 1, 'R');

// Notes
if (!empty($quotation['notes'])) {
    $pdf->Ln(5);
    $pdf->SetFont('helvetica', 'B', 12);
    $pdf->Cell(0, 10, 'Notes:', 0, 1, 'L');
    $pdf->SetFont('helvetica', '', 10);
    $pdf->MultiCell(0, 5, $quotation['notes'], 0, 'L', 0, 1, '', '', true);
}

// Terms and conditions
$pdf->Ln(5);
$pdf->SetFont('helvetica', 'B', 12);
$pdf->Cell(0, 10, 'Terms and Conditions:', 0, 1, 'L');
$pdf->SetFont('helvetica', '', 10);
$pdf->MultiCell(0, 5, "1. This quotation is valid for " . QUOTE_EXPIRY_DAYS . " days from the date of issue.\n2. 50% advance payment is required to confirm the order.\n3. Delivery time: 2-3 weeks after confirmation of order.\n4. Installation charges are included in the quotation.\n5. Warranty as per manufacturer's terms and conditions.\n6. Prices are subject to change without prior notice.", 0, 'L', 0, 1, '', '', true);

// Signature
$pdf->Ln(10);
$pdf->Cell(95, 5, 'For ' . COMPANY_NAME, 0, 0, 'L');
$pdf->Cell(95, 5, 'Customer Acceptance', 0, 1, 'L');
$pdf->Ln(15);
$pdf->Cell(95, 0, '', 'T', 0, 'L');
$pdf->Cell(95, 0, '', 'T', 1, 'L');
$pdf->Cell(95, 5, 'Authorized Signature', 0, 0, 'L');
$pdf->Cell(95, 5, 'Signature & Date', 0, 1, 'L');

// Output PDF
$pdfFilename = 'quotation_' . $quotation['quotation_number'] . '.pdf';
$pdf->Output($pdfFilename, 'I'); // 'I' means send to browser

// Send email with PDF attachment
// This would be implemented here using PHPMailer or similar library

