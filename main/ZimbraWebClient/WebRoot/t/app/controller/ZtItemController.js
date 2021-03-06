/*
 * ***** BEGIN LICENSE BLOCK *****
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
 * ***** END LICENSE BLOCK *****
 */

/**
 * Base class for a controller that manages a single item. It handles item actions initiated by a dropdown action menu
 * anchored to the toolbar, or from within the item itself.
 *
 * @see ZtItemPanel
 * @see ZtItem
 * @author Conrad Damon <cdamon@zimbra.com>
 */

Ext.define('ZCS.controller.ZtItemController', {

	extend: 'ZCS.controller.ZtBaseController',

	requires: [
		'ZCS.common.ZtMenu'
	],

	config: {

		refs: {
			itemPanelToolbar: '',
			itemPanel: ''
		},

		control: {
			itemPanelToolbar: {
				showMenu: 'doShowMenu'
			}
		},

		item: null
	},

	launch: function () {
        //<debug>
		Ext.Logger.verbose('STARTUP: item ctlr launch - ' + ZCS.util.getClassName(this));
        //</debug>
		this.callParent();
	},

	/**
	 * Clears the content of the toolbar. Hides placeholder text if appropriate.
	 *
	 * @param {Boolean}     noItemsFound        if true, list panel
	 */
	clear: function(noItemsFound) {

		this.updateToolbar({
			title:      '',
			hideAll:    true
		});

		// Don't show placeholder text if there is nothing to select
		var itemListView = this.getItemPanel().down('list'),
			placeholderText = itemListView && itemListView.emptyTextCmp;

		if (placeholderText) {
			if (noItemsFound) {
				placeholderText.hide();
			}
			else {
				placeholderText.show();
			}
		}
	},

	/**
	 * Displays the given item in a ZtItemPanel.
	 *
	 * @param {ZtItem}  item        the item
	 */
	showItem: function(item) {
		this.clear();
		this.setItem(item);
	},

	/**
	 * Performs a simple server operation on an item. Generally that means some sort of
	 * ActionRequest with an 'op' attribute and possibly other arguments.
	 *
	 * @param {ZtItem}          item    item to act on
	 * @param {Object|String}   data    data to save, or op to perform
	 * @param {Function} success    The function to run on succes.
	 */
	performOp: function(item, data, callback) {

		item = item || this.getItem();
		if (item) {
			if (Ext.isString(data)) {
				data = { op: data };
			}
			data.success = function(item, operation) {
                //<debug>
				Ext.Logger.info('item op ' + data.op + ' done');
                //</debug>
				if (callback) {
					callback(item);
				}
			};
			item.save(data);
		}
	},

	/**
	 * Returns the toolbar button for the given operation.
	 *
	 * @param {String}      op      operation constant
	 *
	 * @return {Ext.Button} button
	 */
	getItemButton: function(op) {

		var app = ZCS.util.getAppFromObject(this),
			buttonConfig = ZCS.constant.ITEM_BUTTONS[app],
			toolbar = this.getItemPanelToolbar(),
			ln = buttonConfig.length, i;

		if (toolbar) {
			for (i = 0; i < ln; i++) {
				if (op === buttonConfig[i].op) {
					return toolbar.down('#' + buttonConfig[i].itemId);
				}
			}
		}

		return null;
	},

	/**
	 * Shows or hides a button.
	 *
	 * @param {String}      op      operation constant
	 * @param {Boolean}     show    if true, show the button; otherwise, hide it
	 *
	 * @return {Ext.Button} button
	 */
	showButton: function(op, show) {

		var button = this.getItemButton(op);
		if (button) {
			if (show) {
				button.show();
			}
			else {
				button.hide();
			}
			button.setHidden(!show);
		}
	},

	/**
	 * Sets the title of the toolbar and shows or hides buttons as appropriate.
	 *
	 * @param {Object}      params      parameters:
	 *                                      title       toolbar title
	 *                                      hideAll     if true, hide all buttons
	 *                                      isDraft     if true, draft is being displayed
	 */
	updateToolbar: function(params) {
		var toolbar = this.getItemPanelToolbar();
		if (toolbar && params && params.title != null) {
			toolbar.setTitle(params.title);
		}
	},

	/**
	 * Adds or removes a tag to/from the given item.
	 *
	 * @param {ZtMailItem}  item        item
	 * @param {String}      tagName     name of tag to add or remove
	 * @param {Boolean}     remove      if true, remove the tag
	 */
	tagItem: function(item, tagName, remove) {

		this.performOp(item, {
			op: remove ? '!tag' : 'tag',
			tn: tagName
		}, function() {
			var toastMsg = remove ? ZtMsg.tagRemoved : ZtMsg.tagAdded;
			ZCS.app.fireEvent('showToast', Ext.String.format(toastMsg, tagName));
		});
	}
});
