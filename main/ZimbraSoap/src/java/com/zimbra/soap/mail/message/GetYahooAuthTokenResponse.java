/*
 * ***** BEGIN LICENSE BLOCK *****
 * Zimbra Collaboration Suite Server
 * Copyright (C) 2011, 2012 VMware, Inc.
 * 
 * The contents of this file are subject to the Zimbra Public License
 * Version 1.3 ("License"); you may not use this file except in
 * compliance with the License.  You may obtain a copy of the License at
 * http://www.zimbra.com/license.
 * 
 * Software distributed under the License is distributed on an "AS IS"
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied.
 * ***** END LICENSE BLOCK *****
 */

package com.zimbra.soap.mail.message;

import com.google.common.base.Objects;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlRootElement;

import com.zimbra.common.soap.MailConstants;
import com.zimbra.soap.type.ZmBoolean;

@XmlAccessorType(XmlAccessType.NONE)
@XmlRootElement(name=MailConstants.E_GET_YAHOO_AUTH_TOKEN_RESPONSE)
public class GetYahooAuthTokenResponse {

    /**
     * @zm-api-field-tag failed
     * @zm-api-field-description Failed
     */
    @XmlAttribute(name="failed", required=false)
    private ZmBoolean failed;

    public GetYahooAuthTokenResponse() {
    }

    public void setFailed(Boolean failed) { this.failed = ZmBoolean.fromBool(failed); }
    public Boolean getFailed() { return ZmBoolean.toBool(failed); }

    public Objects.ToStringHelper addToStringInfo(Objects.ToStringHelper helper) {
        return helper
            .add("failed", failed);
    }

    @Override
    public String toString() {
        return addToStringInfo(Objects.toStringHelper(this)).toString();
    }
}
