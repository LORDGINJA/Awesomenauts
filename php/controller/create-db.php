<?php
	//connects this file to the config file
	require_once(__DIR__ . "/../model/config.php"); 

	$query = $_SESSION["connection"]->query("CREATE TABLE posts ("
 			//creates an id for each blogpost.  id cannot be null.  increments id integers
			. "id int(11) NOT NULL AUTO_INCREMENT, "
			//stores title of blogpost.  can have up to 255 characters.  must have a title
			. "title varchar (255) NOT NULL, " 
			//posts can't be empty
			. "post text NOT NULL, " 
			//inputs the date and time the post was submitted into the database
			. "DateTime datetime NOT NULL ,"
			//sets primary key for table.  the way tables are connected to each other
			. "PRIMARY KEY (id))"); 

	//runs if the table is working
	if($query){  
   		//echo "<p>Succesfully create table: posts</p>";
	}
	//says if the table already exists or if there is an error
	else{  
		//echo " <p>" . $_SESSION["connection"]->error . "</p>";
	}

	//creating a table to store users' usernames, emails, and passwords in phpMyAdmin.  pretty much the same as previous table
	$query = $_SESSION["connection"]->query("CREATE TABLE users ("
		. "id int(11) NOT NULL AUTO_INCREMENT, "
		. "username varchar(30) NOT NULL, "
		. "email varchar(50) NOT NULL, "
		. "password char(128) NOT NULL, "
		. "salt char(128) NOT NULL, "
		. "PRIMARY KEY (id))");

	//lets me know that the users' database has been created
	if($query){
		//echo "<p> Successfully created table: users </p>";
	}


	//if the database hasn't been created, this echoes out the error
	else{
		//echo "<p>" . $_SESSION["connection"]->error . "</p>";
	}

?>