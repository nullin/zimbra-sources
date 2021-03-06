/*
 * ***** BEGIN LICENSE BLOCK *****
 * 
 * Zimbra Collaboration Suite Server
 * Copyright (C) 2011 VMware, Inc.
 * 
 * The contents of this file are subject to the Zimbra Public License
 * Version 1.3 ("License"); you may not use this file except in
 * compliance with the License.  You may obtain a copy of the License at
 * http://www.zimbra.com/license.
 * 
 * Software distributed under the License is distributed on an "AS IS"
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied.
 * 
 * ***** END LICENSE BLOCK *****
 */
package com.zimbra.qa.selenium.projects.desktop.tests.login;

import org.testng.annotations.Test;

import com.zimbra.qa.selenium.framework.util.HarnessException;
import com.zimbra.qa.selenium.framework.util.ZAssert;
import com.zimbra.qa.selenium.framework.util.ZimbraAccount;
import com.zimbra.qa.selenium.projects.desktop.core.AjaxCommonTest;

public class BasicLogin extends AjaxCommonTest {
	
	public BasicLogin() {	
	}

	@Test(	description = "Login to the Ajax Client",
			groups = { "sanity" })
	public void BasicLogin01() throws HarnessException {

		// Login
		app.zPageLogin.zLogin(ZimbraAccount.AccountZMC());
		
		// Verify main page becomes active
		ZAssert.assertTrue(app.zPageMain.zIsActive(), "Verify that the account is logged in");

	}

}
