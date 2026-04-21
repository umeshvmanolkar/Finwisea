function doPost(e) {
  // Set headers to allow cross-origin requests
  var headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
  
  try {
    // We expect the frontend to send data as "text/plain" and stringified JSON to avoid CORS preflight issues
    var requestData = JSON.parse(e.postData.contents);
    var action = requestData.action;
    
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    if (action === "signup") {
      return handleSignup(sheet, requestData);
    } else if (action === "login") {
      return handleLogin(sheet, requestData);
    } else {
      return createJsonResponse({ status: "error", message: "Invalid action" });
    }
    
  } catch (error) {
    return createJsonResponse({ status: "error", message: error.toString() });
  }
}

function handleSignup(sheet, data) {
  // Check if email already exists
  var dataRange = sheet.getDataRange();
  var values = dataRange.getValues();
  
  // Assume Row 1 is header: Timestamp | Name | Email | Password
  // If spreadsheet is empty, initialization
  if (values.length === 1 && values[0][0] === "") {
     sheet.appendRow(["Timestamp", "Name", "Email", "Password"]);
     values = sheet.getDataRange().getValues(); // Refresh
  } else if (values.length === 0) {
     sheet.appendRow(["Timestamp", "Name", "Email", "Password"]);
  }
  
  // Simple check for duplicate email
  for (var i = 1; i < values.length; i++) {
    if (values[i][2] === data.email) {
      return createJsonResponse({ status: "error", message: "Email already registered" });
    }
  }
  
  // Hash password using SHA-256 before saving
  var hashedPassword = hashPassword(data.password);
  var timestamp = new Date();
  sheet.appendRow([timestamp, data.name, data.email, hashedPassword]);
  
  return createJsonResponse({ status: "success", message: "Registration successful" });
}

function handleLogin(sheet, data) {
  var dataRange = sheet.getDataRange();
  var values = dataRange.getValues();
  
  var hashedLoginPassword = hashPassword(data.password);
  
  for (var i = 1; i < values.length; i++) {
    var email = values[i][2];
    var storedPassword = values[i][3];
    
    if (email === data.email && storedPassword === hashedLoginPassword) {
      var name = values[i][1];
      return createJsonResponse({ 
        status: "success", 
        message: "Login successful",
        user: { name: name, email: email }
      });
    }
  }
  
  return createJsonResponse({ status: "error", message: "Invalid email or password" });
}

function hashPassword(password) {
  var rawHash = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, password);
  return Utilities.base64Encode(rawHash);
}

function createJsonResponse(responseObject) {
  var output = JSON.stringify(responseObject);
  return ContentService.createTextOutput(output).setMimeType(ContentService.MimeType.JSON);
}

// Ensure GET requests work too, maybe return a status check
function doGet(e) {
  return createJsonResponse({ status: "success", message: "Finwisea API is running." });
}
