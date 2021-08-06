<?php

  //validate data
  $errors = '';
  $contact = 'contact@daphneelizabeth.com';

  if(empty($_POST['name']) ||
    empty($_POST['email']) ||
    empty($_POST['subject']) ||
    empty($_POST['inquiry-type']) ||
    empty($_POST['message'])) {

      $errors .= "\n Error: Please fill out all required fields";
    }

  $name = $_POST['name'];
  $email = $_POST['email'];
  $subject = $_POST['subject'];
  $inquiry = $_POST['inquiry-type'];
  $message = $_POST['message'];

  if(!preg_match("/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i",
    $email)) {

      $errors .= "\n Error: Invalid email address";
    }

  //create and send the email
  if(empty($errors)) {

    $to = $contact;
    $emailSubject = "$subject";
    $emailBody = "$message\n".
      "\n $name \n $email";
    $headers = "From: $contact\n";
    $headers .= "Reply-To: $email";

    mail($to, $emailSubject, $emailBody, $headers);

    //message confirmation
    echo "Thank you for reaching out! Keep an eye out- Daphne will be in touch with you soon." . "<a href='index.html' style='text-decoration:none;'> Return to Page</a>";
  }

?>