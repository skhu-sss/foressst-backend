const system = require("system");
const webPage = require("webpage");
const page = webPage.create();

const url = "https://forest.skhu.ac.kr/GATE/SAM/LESSON/A/SSEA33S.ASPX?maincd=O&systemcd=S&seq=1";
const TXTYY = system.args[1] == undefined ? "" : system.args[1];
const DDLHAGGI = system.args[2] == undefined ? "" : system.args[2];
const STAFFNO = system.args[3] == undefined ? "" : system.args[3];
const STAGGNAME = system.args[4] == undefined ? "" : system.args[4];
const HIDESTAFFNO = system.args[3] == undefined ? "" : system.args[3];
const OCCUPATIONSCODE = system.args[5] == undefined ? "" : system.args[5];
const JOBCODE = system.args[6] == undefined ? "" : system.args[6];
const UNIVERSITYCODE = system.args[7] == undefined ? "" : system.args[7];
const DEPARTMENTCODE = system.args[8] == undefined ? "" : system.args[8];
const BELONGCODE = system.args[9] == undefined ? "" : system.args[9];
const SOCIALNO = system.args[10] == undefined ? "" : system.args[10];
const COOKIE1_domain = system.args[11];
const COOKIE1_httponly = system.args[12];
const COOKIE1_name = system.args[13];
const COOKIE1_path = system.args[14];
const COOKIE1_secure = system.args[15];
const COOKIE1_value = system.args[16];
const COOKIE2_domain = system.args[17];
const COOKIE2_httponly = system.args[18];
const COOKIE2_name = system.args[19];
const COOKIE2_path = system.args[20];
const COOKIE2_secure = system.args[21];
const COOKIE2_value = system.args[22];
const COOKIE3_domain = system.args[23];
const COOKIE3_httponly = system.args[24];
const COOKIE3_name = system.args[25];
const COOKIE3_path = system.args[26];
const COOKIE3_secure = system.args[27];
const COOKIE3_value = system.args[28];
const COOKIE4_domain = system.args[29];
const COOKIE4_httponly = system.args[30];
const COOKIE4_name = system.args[31];
const COOKIE4_path = system.args[32];
const COOKIE4_secure = system.args[33];
const COOKIE4_value = system.args[34];

let submited = false;

// Add Cookies
phantom.addCookie({"domain":COOKIE1_domain, "httponly":COOKIE1_httponly, "name":COOKIE1_name, "path":COOKIE1_path, "secure":COOKIE1_secure, "value":COOKIE1_value});
phantom.addCookie({"domain":COOKIE2_domain, "httponly":COOKIE2_httponly, "name":COOKIE2_name, "path":COOKIE2_path, "secure":COOKIE2_secure, "value":COOKIE2_value});
phantom.addCookie({"domain":COOKIE3_domain, "httponly":COOKIE3_httponly, "name":COOKIE3_name, "path":COOKIE3_path, "secure":COOKIE3_secure, "value":COOKIE3_value});
phantom.addCookie({"domain":COOKIE4_domain, "httponly":COOKIE4_httponly, "name":COOKIE4_name, "path":COOKIE4_path, "secure":COOKIE4_secure, "value":COOKIE4_value});

page.settings.userAgent = "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)";
page.settings.javascriptEnabled = true;

// Load Syllabus Page
page.open(url, (status) => {
});

// If Page is fully loaded
page.onLoadFinished = (status) => {
	if(submited==false){
		page.evaluate((year, haggi, txtStaffNO, txtStaffName, hidStaffNO, hidJikjongCode, hidJikgubCode, hidDaehagCd, hidHagbuCd, hidSosogCd, hidSocialNO) => {
			// Set Value on Input
			document.querySelector("#txtYy").value = year;
			document.querySelector("#ddlHaggi").value = haggi;
			document.querySelector("#objStaff_txtStaffNO").value = txtStaffNO;
			document.querySelector("#objStaff_txtStaffName").value = txtStaffName;
			document.querySelector("#objStaff_hidStaffNO").value = hidStaffNO;
			document.querySelector("#objStaff_hidJikjongCode").value = hidJikjongCode;
			document.querySelector("#objStaff_hidJikgubCode").value = hidJikgubCode;
			document.querySelector("#objStaff_hidDaehagCd").value = hidDaehagCd;
			document.querySelector("#objStaff_hidHagbuCd").value = hidHagbuCd;
			document.querySelector("#objStaff_hidSosogCd").value = hidSosogCd;
			document.querySelector("#objStaff_hidSocialNO").value = hidSocialNO;
			// Submit
			document.querySelector("#Form1").submit();
		}, TXTYY, DDLHAGGI, STAFFNO, STAGGNAME, HIDESTAFFNO, OCCUPATIONSCODE, JOBCODE, UNIVERSITYCODE, DEPARTMENTCODE, BELONGCODE, SOCIALNO);
		submited = true;
	}else{
		page.evaluate(() => {
			// Click the button to load data
			document.querySelector("#btnList").click();
		});
	}
};

// Error Handling
page.onError = (msg, trace) => {

	const msgStack = ["ERROR: " + msg];

	if (trace && trace.length) {
		msgStack.push("TRACE:");
		trace.forEach((t) => {
			msgStack.push(" -> " + t.file + ": " + t.line + (t.function ? " (in function \"" + t.function +"\")" : ""));
		});
	}

	// console.error(msgStack.join('\n'));
	// phantom.exit();
};

page.onResourceRequested = (requestData, networkRequest) => {
	// Block CoreSecurity.js - It will redirect us to the main page
	const burl="https://forest.skhu.ac.kr/Gate/Common/JavaScript/CoreSecurity.js";
	if(requestData.url==burl){
		networkRequest.abort();
	}
};

// When "Search" button clicked, it will make this event invoked soon.
// use this event to get data
page.onResourceReceived = (response) => {
	const doneurl = "https://forest.skhu.ac.kr/GATE/SAM/LESSON/A/SSEA33S.ASPX?maincd=O&systemcd=S&seq=1";
	if(response.url == doneurl){
		// Wait for data to be displayed on the page.
		// For one sec maybe?
		setTimeout(() => {
			// Pass page content to node server with "console.log"
			//console.log(page.content);
			// OK, Done.
			phantom.exit();
		}, 1000);
	}
};
