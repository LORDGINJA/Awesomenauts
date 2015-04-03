		<?php 
			//gives access to database
			require_once(__DIR__ . "/../model/config.php");
			//stores many variables in ome object
			$array = array{
				'exp' => '',
				'exp1' => '',
				'exp2' => '',
				'exp3' => '',
				'exp4' => '',
			};
			//stores username and filters input
			$username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);
			//stores username and filters input
			$password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);
			//selects proper user from database
			$query = $_SESSION["connection"]->query("SELECT * FROM users WHERE username = '$username' ");

			if ($query->num_rows == 1) {
				$row = $query->fetch_array();

				if ($row["password"] === crypt($password, $row["salt"]) ){
					//only allows users to log in
					$_SESSION["authenticated"] = true;
					//takes expierence values from above
					$array["exp"] = $row["exp"];
					//takes expierence values from above
					$array["exp1"] = $row["exp1"];
					//takes expierence values from above
					$array["exp2"] = $row["exp2"];
					//takes expierence values from above
					$array["exp3"] = $row["exp3"];
					//takes expierence values from above
					$array["exp4"] = $row["exp4"];
					$_SESSION["$name"] = $username;
					//echoes out whole array 
					echo json_encode($array);				
				}

				else{
					echo "Invalid username and/or password";
				}
			}

			else {
				echo "Invalid username and/or password";
			}
		?>
