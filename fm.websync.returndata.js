
/*
 * Title: WebSync Client ReturnData Extension for JavaScript
 * Version: 4.8.8
 * Copyright Frozen Mountain Software 2011+
 */

(function(name, dependencies, definition) {
    if (typeof define === 'function' && define.amd) { // AMD/RequireJS
        define(name, dependencies, definition);
    } else if (typeof exports === 'object') { // Node/CommonJS
        for (var i = 0; i < dependencies.length; i++) {
            require('./' + dependencies[i]);
        }
        module.exports = definition();
    } else {
        this[name] = definition();
    }
}('fm.websync.returndata', ['fm.websync', 'fm'], function() {

if (typeof global !== 'undefined' && !global.window) { global.window = global; global.document = { cookie: '' }; }

if (!window.fm) { throw new Error("fm must be loaded before fm.websync.returndata."); }

if (!window.fm.websync) { throw new Error("fm.websync must be loaded before fm.websync.returndata."); }

if (!window.fm.websync.returndata) { window.fm.websync.returndata = {}; }

fm.websync.returndata.getVersion = function() {
  return '4.8.8';
};



/*<span id='cls-fm.websync.returndata.base'>&nbsp;</span> */

/**
@class fm.websync.returndata.base
 <div>
 Base methods supporting the ReturnData extension.
 </div>

@extends fm.object
 */
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.returndata.base = (function(superClass) {
  extend(base, superClass);

  base._returnDataExtensionName = null;

  function base() {
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = base.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
  }


  /*<span id='method-fm.websync.returndata.base-getReturnData'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets whether data should be returned with the response.
  	 </div>
  	@function getReturnData
  	@param {fm.websync.extensible} extensible The fm.websync.extensible object.
  	@return {fm.nullable} True if the data should be returned, false if not, and null if not specified.
   */

  base.getReturnData = function() {
    var extensible;
    extensible = arguments[0];
    return fm.serializer.deserializeBoolean(extensible.getExtensionValueJson(fm.websync.returndata.base._returnDataExtensionName));
  };


  /*<span id='method-fm.websync.returndata.base-setReturnData'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets whether data should be returned with the response.
  	 </div>
  	@function setReturnData
  	@param {fm.websync.extensible} extensible The fm.websync.extensible object.
  	@param {Boolean} returnData If set to true return data with the response.
  	@return {void}
   */

  base.setReturnData = function() {
    var extensible, returnData;
    extensible = arguments[0];
    returnData = arguments[1];
    return extensible.setExtensionValueJson(fm.websync.returndata.base._returnDataExtensionName, fm.serializer.serializeBoolean(returnData));
  };

  base._returnDataExtensionName = "fm.returnData";

  return base;

})(fm.object);



/*<span id='cls-fm.websync.returndata.serviceArgsExtensions'>&nbsp;</span> */

/**
@class fm.websync.returndata.serviceArgsExtensions
 <div>
 <see cref="fm.websync.serviceArgs">fm.websync.serviceArgs</see> extension methods for the ReturnData extension.
 </div>
 */
fm.websync.returndata.serviceArgsExtensions = (function() {
  function serviceArgsExtensions() {
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = serviceArgsExtensions.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
  }


  /*<span id='method-fm.websync.returndata.serviceArgsExtensions-getReturnData'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets whether or not serviced data should be returned in the response.
  	 </div>
  	@function getReturnData
  	@param {fm.websync.serviceArgs} serviceArgs The fm.websync.serviceArgs to extend.
  	@return {fm.nullable} true if the serviced data should be returned in the response;
  	 false if the serviced data should not be returned in the response;
  	 null it not specified.
   */

  serviceArgsExtensions.getReturnData = function() {
    var serviceArgs;
    serviceArgs = arguments[0];
    return fm.websync.returndata.base.getReturnData(serviceArgs);
  };


  /*<span id='method-fm.websync.returndata.serviceArgsExtensions-setReturnData'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets whether or not to return the serviced data in the response.
  	 </div>
  	@function setReturnData
  	@param {fm.websync.serviceArgs} serviceArgs The fm.websync.serviceArgs to extend.
  	@param {Boolean} returnData Whether or not to return the serviced data in the response.
  	@return {fm.websync.serviceArgs} The fm.websync.serviceArgs.
   */

  serviceArgsExtensions.setReturnData = function() {
    var returnData, serviceArgs;
    serviceArgs = arguments[0];
    returnData = arguments[1];
    fm.websync.returndata.base.setReturnData(serviceArgs, returnData);
    return serviceArgs;
  };


  /*<span id='method-fm.websync.returndata.serviceArgsExtensions-getReturnData'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets whether or not serviced data should be returned in the response.
  	 </div>
  	@function getReturnData
  	@return {fm.nullable} true if the serviced data should be returned in the response;
  	 false if the serviced data should not be returned in the response;
  	 null it not specified.
   */

  fm.websync.serviceArgs.prototype.getReturnData = function() {
    Array.prototype.splice.call(arguments, 0, 0, this);
    return fm.websync.returndata.serviceArgsExtensions.getReturnData.apply(this, arguments);
  };


  /*<span id='method-fm.websync.returndata.serviceArgsExtensions-setReturnData'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets whether or not to return the serviced data in the response.
  	 </div>
  	@function setReturnData
  	@param {Boolean} returnData Whether or not to return the serviced data in the response.
  	@return {fm.websync.serviceArgs} The fm.websync.serviceArgs.
   */

  fm.websync.serviceArgs.prototype.setReturnData = function() {
    var returnData;
    returnData = arguments[0];
    Array.prototype.splice.call(arguments, 0, 0, this);
    return fm.websync.returndata.serviceArgsExtensions.setReturnData.apply(this, arguments);
  };

  return serviceArgsExtensions;

})();



/*<span id='cls-fm.websync.returndata.notifyArgsExtensions'>&nbsp;</span> */

/**
@class fm.websync.returndata.notifyArgsExtensions
 <div>
 <see cref="fm.websync.notifyArgs">fm.websync.notifyArgs</see> extension methods for the ReturnData extension.
 </div>
 */
fm.websync.returndata.notifyArgsExtensions = (function() {
  function notifyArgsExtensions() {
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = notifyArgsExtensions.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
  }


  /*<span id='method-fm.websync.returndata.notifyArgsExtensions-getReturnData'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets whether or not notified data should be returned in the response.
  	 </div>
  	@function getReturnData
  	@param {fm.websync.notifyArgs} notifyArgs The fm.websync.notifyArgs to extend.
  	@return {fm.nullable} true if the notified data should be returned in the response;
  	 false if the notified data should not be returned in the response;
  	 null it not specified.
   */

  notifyArgsExtensions.getReturnData = function() {
    var notifyArgs;
    notifyArgs = arguments[0];
    return fm.websync.returndata.base.getReturnData(notifyArgs);
  };


  /*<span id='method-fm.websync.returndata.notifyArgsExtensions-setReturnData'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets whether or not to return the notified data in the response.
  	 </div>
  	@function setReturnData
  	@param {fm.websync.notifyArgs} notifyArgs The fm.websync.notifyArgs to extend.
  	@param {Boolean} returnData Whether or not to return the notified data in the response.
  	@return {fm.websync.notifyArgs} The fm.websync.notifyArgs.
   */

  notifyArgsExtensions.setReturnData = function() {
    var notifyArgs, returnData;
    notifyArgs = arguments[0];
    returnData = arguments[1];
    fm.websync.returndata.base.setReturnData(notifyArgs, returnData);
    return notifyArgs;
  };


  /*<span id='method-fm.websync.returndata.notifyArgsExtensions-getReturnData'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets whether or not notified data should be returned in the response.
  	 </div>
  	@function getReturnData
  	@return {fm.nullable} true if the notified data should be returned in the response;
  	 false if the notified data should not be returned in the response;
  	 null it not specified.
   */

  fm.websync.notifyArgs.prototype.getReturnData = function() {
    Array.prototype.splice.call(arguments, 0, 0, this);
    return fm.websync.returndata.notifyArgsExtensions.getReturnData.apply(this, arguments);
  };


  /*<span id='method-fm.websync.returndata.notifyArgsExtensions-setReturnData'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets whether or not to return the notified data in the response.
  	 </div>
  	@function setReturnData
  	@param {Boolean} returnData Whether or not to return the notified data in the response.
  	@return {fm.websync.notifyArgs} The fm.websync.notifyArgs.
   */

  fm.websync.notifyArgs.prototype.setReturnData = function() {
    var returnData;
    returnData = arguments[0];
    Array.prototype.splice.call(arguments, 0, 0, this);
    return fm.websync.returndata.notifyArgsExtensions.setReturnData.apply(this, arguments);
  };

  return notifyArgsExtensions;

})();



/*<span id='cls-fm.websync.returndata.notificationExtensions'>&nbsp;</span> */

/**
@class fm.websync.returndata.notificationExtensions
 <div>
 <see cref="fm.websync.notification">fm.websync.notification</see> extension methods for the ReturnData extension.
 </div>
 */
fm.websync.returndata.notificationExtensions = (function() {
  function notificationExtensions() {
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = notificationExtensions.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
  }


  /*<span id='method-fm.websync.returndata.notificationExtensions-getReturnData'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets whether or not notified data should be returned in the response.
  	 </div>
  	@function getReturnData
  	@param {fm.websync.notification} notification The fm.websync.notification to extend.
  	@return {fm.nullable} true if the notified data should be returned in the response;
  	 false if the notified data should not be returned in the response;
  	 null it not specified.
   */

  notificationExtensions.getReturnData = function() {
    var notification;
    notification = arguments[0];
    return fm.websync.returndata.base.getReturnData(notification);
  };


  /*<span id='method-fm.websync.returndata.notificationExtensions-setReturnData'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets whether or not to return the notified data in the response.
  	 </div>
  	@function setReturnData
  	@param {fm.websync.notification} notification The fm.websync.notification to extend.
  	@param {Boolean} returnData Whether or not to return the notified data in the response.
  	@return {fm.websync.notification} The fm.websync.notification.
   */

  notificationExtensions.setReturnData = function() {
    var notification, returnData;
    notification = arguments[0];
    returnData = arguments[1];
    fm.websync.returndata.base.setReturnData(notification, returnData);
    return notification;
  };


  /*<span id='method-fm.websync.returndata.notificationExtensions-getReturnData'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets whether or not notified data should be returned in the response.
  	 </div>
  	@function getReturnData
  	@return {fm.nullable} true if the notified data should be returned in the response;
  	 false if the notified data should not be returned in the response;
  	 null it not specified.
   */

  fm.websync.notification.prototype.getReturnData = function() {
    Array.prototype.splice.call(arguments, 0, 0, this);
    return fm.websync.returndata.notificationExtensions.getReturnData.apply(this, arguments);
  };


  /*<span id='method-fm.websync.returndata.notificationExtensions-setReturnData'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets whether or not to return the notified data in the response.
  	 </div>
  	@function setReturnData
  	@param {Boolean} returnData Whether or not to return the notified data in the response.
  	@return {fm.websync.notification} The fm.websync.notification.
   */

  fm.websync.notification.prototype.setReturnData = function() {
    var returnData;
    returnData = arguments[0];
    Array.prototype.splice.call(arguments, 0, 0, this);
    return fm.websync.returndata.notificationExtensions.setReturnData.apply(this, arguments);
  };

  return notificationExtensions;

})();



/*<span id='cls-fm.websync.returndata.publicationExtensions'>&nbsp;</span> */

/**
@class fm.websync.returndata.publicationExtensions
 <div>
 <see cref="fm.websync.publication">fm.websync.publication</see> extension methods for the ReturnData extension.
 </div>
 */
fm.websync.returndata.publicationExtensions = (function() {
  function publicationExtensions() {
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = publicationExtensions.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
  }


  /*<span id='method-fm.websync.returndata.publicationExtensions-getReturnData'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets whether or not published data should be returned in the response.
  	 </div>
  	@function getReturnData
  	@param {fm.websync.publication} publication The fm.websync.publication to extend.
  	@return {fm.nullable} true if the published data should be returned in the response;
  	 false if the published data should not be returned in the response;
  	 null it not specified.
   */

  publicationExtensions.getReturnData = function() {
    var publication;
    publication = arguments[0];
    return fm.websync.returndata.base.getReturnData(publication);
  };


  /*<span id='method-fm.websync.returndata.publicationExtensions-setReturnData'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets whether or not to return the published data in the response.
  	 </div>
  	@function setReturnData
  	@param {fm.websync.publication} publication The fm.websync.publication to extend.
  	@param {Boolean} returnData Whether or not to return the published data in the response.
  	@return {fm.websync.publication} The fm.websync.publication.
   */

  publicationExtensions.setReturnData = function() {
    var publication, returnData;
    publication = arguments[0];
    returnData = arguments[1];
    fm.websync.returndata.base.setReturnData(publication, returnData);
    return publication;
  };


  /*<span id='method-fm.websync.returndata.publicationExtensions-getReturnData'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets whether or not published data should be returned in the response.
  	 </div>
  	@function getReturnData
  	@return {fm.nullable} true if the published data should be returned in the response;
  	 false if the published data should not be returned in the response;
  	 null it not specified.
   */

  fm.websync.publication.prototype.getReturnData = function() {
    Array.prototype.splice.call(arguments, 0, 0, this);
    return fm.websync.returndata.publicationExtensions.getReturnData.apply(this, arguments);
  };


  /*<span id='method-fm.websync.returndata.publicationExtensions-setReturnData'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets whether or not to return the published data in the response.
  	 </div>
  	@function setReturnData
  	@param {Boolean} returnData Whether or not to return the published data in the response.
  	@return {fm.websync.publication} The fm.websync.publication.
   */

  fm.websync.publication.prototype.setReturnData = function() {
    var returnData;
    returnData = arguments[0];
    Array.prototype.splice.call(arguments, 0, 0, this);
    return fm.websync.returndata.publicationExtensions.setReturnData.apply(this, arguments);
  };

  return publicationExtensions;

})();



/*<span id='cls-fm.websync.returndata.publishArgsExtensions'>&nbsp;</span> */

/**
@class fm.websync.returndata.publishArgsExtensions
 <div>
 <see cref="fm.websync.publishArgs">fm.websync.publishArgs</see> extension methods for the ReturnData extension.
 </div>
 */
fm.websync.returndata.publishArgsExtensions = (function() {
  function publishArgsExtensions() {
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = publishArgsExtensions.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
  }


  /*<span id='method-fm.websync.returndata.publishArgsExtensions-getReturnData'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets whether or not published data should be returned in the response.
  	 </div>
  	@function getReturnData
  	@param {fm.websync.publishArgs} publishArgs The fm.websync.publishArgs to extend.
  	@return {fm.nullable} true if the published data should be returned in the response;
  	 false if the published data should not be returned in the response;
  	 null it not specified.
   */

  publishArgsExtensions.getReturnData = function() {
    var publishArgs;
    publishArgs = arguments[0];
    return fm.websync.returndata.base.getReturnData(publishArgs);
  };


  /*<span id='method-fm.websync.returndata.publishArgsExtensions-setReturnData'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets whether or not to return the published data in the response.
  	 </div>
  	@function setReturnData
  	@param {fm.websync.publishArgs} publishArgs The fm.websync.publishArgs to extend.
  	@param {Boolean} returnData Whether or not to return the published data in the response.
  	@return {fm.websync.publishArgs} The fm.websync.publishArgs.
   */

  publishArgsExtensions.setReturnData = function() {
    var publishArgs, returnData;
    publishArgs = arguments[0];
    returnData = arguments[1];
    fm.websync.returndata.base.setReturnData(publishArgs, returnData);
    return publishArgs;
  };


  /*<span id='method-fm.websync.returndata.publishArgsExtensions-getReturnData'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets whether or not published data should be returned in the response.
  	 </div>
  	@function getReturnData
  	@return {fm.nullable} true if the published data should be returned in the response;
  	 false if the published data should not be returned in the response;
  	 null it not specified.
   */

  fm.websync.publishArgs.prototype.getReturnData = function() {
    Array.prototype.splice.call(arguments, 0, 0, this);
    return fm.websync.returndata.publishArgsExtensions.getReturnData.apply(this, arguments);
  };


  /*<span id='method-fm.websync.returndata.publishArgsExtensions-setReturnData'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets whether or not to return the published data in the response.
  	 </div>
  	@function setReturnData
  	@param {Boolean} returnData Whether or not to return the published data in the response.
  	@return {fm.websync.publishArgs} The fm.websync.publishArgs.
   */

  fm.websync.publishArgs.prototype.setReturnData = function() {
    var returnData;
    returnData = arguments[0];
    Array.prototype.splice.call(arguments, 0, 0, this);
    return fm.websync.returndata.publishArgsExtensions.setReturnData.apply(this, arguments);
  };

  return publishArgsExtensions;

})();


return fm.websync.returndata;
}));