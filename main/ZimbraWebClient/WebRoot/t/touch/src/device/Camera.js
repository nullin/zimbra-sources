/*
 * ***** BEGIN LICENSE BLOCK *****
 * 
 * Zimbra Collaboration Suite Web Client
 * Copyright (C) 2013 VMware, Inc.
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
/**
 * This class allows you to use native APIs to take photos using the device camera.
 *
 * When this singleton is instantiated, it will automatically select the correct implementation depending on the
 * current device:
 *
 * - Sencha Packager
 * - PhoneGap
 * - Simulator
 *
 * Both the Sencha Packager and PhoneGap implementations will use the native camera functionality to take or select
 * a photo. The Simulator implementation will simply return fake images.
 *
 * ## Example
 *
 * You can use the {@link Ext.device.Camera#capture} function to take a photo:
 *
 *     Ext.device.Camera.capture({
 *         success: function(image) {
 *             imageView.setSrc(image);
 *         },
 *         quality: 75,
 *         width: 200,
 *         height: 200,
 *         destination: 'data'
 *     });
 *
 * See the documentation for {@link Ext.device.Camera#capture} all available configurations.
 *
 * @mixins Ext.device.camera.Abstract
 *
 * @aside guide native_apis
 */
Ext.define('Ext.device.Camera', {
    singleton: true,

    requires: [
        'Ext.device.Communicator',
        'Ext.device.camera.PhoneGap',
        'Ext.device.camera.Sencha',
        'Ext.device.camera.Simulator'
    ],

    constructor: function() {
        var browserEnv = Ext.browser.is;

        if (browserEnv.WebView) {
            if (browserEnv.PhoneGap) {
                return Ext.create('Ext.device.camera.PhoneGap');
            }
            else {
                return Ext.create('Ext.device.camera.Sencha');
            }
        }
        else {
            return Ext.create('Ext.device.camera.Simulator');
        }
    }
});
