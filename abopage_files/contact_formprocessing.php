<?php
/**
 * Created by PhpStorm.
 * User: jonas
 * Date: 26/02/14
 * Time: 19:31
 */

// maybe no need
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
// end of no need

if($_POST) {

    // Check if its an ajax request, exit if not
    if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
        die();
    }

    // Set recipient and subjet
    // $to_Email       = "aboservice@tagesanzeiger.ch";
    $to_Email       = "jonas.baumberger@srsly.ch";
    $subject        = 'Kontaktformular: ';

    // Check $_POST vars, exit if any are missing
    if(!isset($_POST["userName"]) || !isset($_POST["userEmail"]) || !isset($_POST["userEmail"]) || !isset($_POST["userMessage"])) {
        die();
    }

    //Sanitize input data using filter_var().
    $user_Name        = filter_var($_POST["userName"], FILTER_SANITIZE_STRING);
    $user_Email       = filter_var($_POST["userEmail"], FILTER_SANITIZE_EMAIL);
    $user_Reason      = filter_var($_POST["userReason"], FILTER_SANITIZE_STRING);
    $user_Website     = filter_var($_POST["userWebsite"], FILTER_SANITIZE_STRING);
    $user_Message     = filter_var($_POST["userMessage"], FILTER_SANITIZE_STRING);

    // Honeypot bot validation - if not empty likely to be a bot
    if($user_Website  != '') {
        exit();
    }

    // Username must be 2 chars long
    if(strlen($user_Name)<2) {
        header('HTTP/1.1 500 Ihr Name ist zu kurz.');
        exit();
    }

    // Validate email
    if(!filter_var($user_Email, FILTER_VALIDATE_EMAIL)) {
        header('HTTP/1.1 500 Bitte geben Sie eine g&uuml;ltige E-Mail-Adresse an.');
        exit();
    }

    // Message must be 8 chars long
    if(strlen($user_Message)<8) {
        header('HTTP/1.1 500 Ihre Nachricht ist zu kurz.');
        exit();
    }

    // finish subject line
    $subject .= $user_Reason." | Aboshop | Der Bund";

    // Setup mail contents - needs rework
    $headers = "From: ".$user_Email.PHP_EOL;
    $headers .= "Reply-To: ".$user_Email.PHP_EOL;
    $headers .= "Content-type: text".PHP_EOL;

    $message = "Nachricht von ".$user_Name.PHP_EOL;
    $message .= $user_Message;

    // Send mail
    @$sentMail = mail($to_Email, $subject, $message, $headers);

    // Output success/error message
    if(!$sentMail) {
        header('HTTP/1.1 500 Beim Versenden der Nachricht ist ein Fehler aufgetreten.');
        exit();
    } else {
        echo 'Vielen Dank für Ihre Nachricht. Wir werden uns so schnell wie möglich mit Ihnen in Verbindung setzen.';
    }
} ?>