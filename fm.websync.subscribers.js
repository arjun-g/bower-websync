
/*
 * Title: WebSync Client Subscribers Extension for JavaScript
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
}('fm.websync.subscribers', ['fm.websync', 'fm'], function() {

if (typeof global !== 'undefined' && !global.window) { global.window = global; global.document = { cookie: '' }; }

if (!window.fm) { throw new Error("fm must be loaded before fm.websync.subscribers."); }

if (!window.fm.websync) { throw new Error("fm.websync must be loaded before fm.websync.subscribers."); }

if (!window.fm.websync.subscribers) { window.fm.websync.subscribers = {}; }

fm.websync.subscribers.getVersion = function() {
  return '4.8.8';
};



/*<span id='cls-fm.websync.subscribers.subscriberChangeType'>&nbsp;</span> */

/**
@class fm.websync.subscribers.subscriberChangeType
 <div>
 The subscribers change type.
 </div><div>
 The type of change to the subscribers of a channel, subscribe or unsubscribe.
 </div>

@extends fm.enum
 */
fm.websync.subscribers.subscriberChangeType = {

  /*<span id='prop-fm.websync.subscribers.subscriberChangeType-Subscribe'>&nbsp;</span> */

  /**
  	 <div>
  	 Indicates that new clients are subscribing to the channel.
  	 </div>
  
  	@field Subscribe
  	@type {fm.websync.subscribers.subscriberChangeType}
   */
  Subscribe: 1,

  /*<span id='prop-fm.websync.subscribers.subscriberChangeType-Unsubscribe'>&nbsp;</span> */

  /**
  	 <div>
  	 Indicates that existing clients are unsubscribing from the channel.
  	 </div>
  
  	@field Unsubscribe
  	@type {fm.websync.subscribers.subscriberChangeType}
   */
  Unsubscribe: 2
};



/*<span id='cls-fm.websync.subscribers.base'>&nbsp;</span> */

/**
@class fm.websync.subscribers.base
 <div>
 Base methods supporting the Subscribers extension.
 </div>

@extends fm.object
 */
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.subscribers.base = (function(superClass) {
  extend(base, superClass);


  /*<span id='prop-fm.websync.subscribers.base-_subscribersChannelPrefix'>&nbsp;</span> */


  /**
  	 <div>
  	 The channel prefix applied to Subscribers notifications.
  	 </div>
  
  	@field _subscribersChannelPrefix
  	@type {String}
   */

  base._subscribersChannelPrefix = "/fm/subscribers";


  /*<span id='prop-fm.websync.subscribers.base-_subscribersExtensionName'>&nbsp;</span> */


  /**
  	 <div>
  	 The reserved name for the Subscribers extension.
  	 </div>
  
  	@field _subscribersExtensionName
  	@type {String}
   */

  base._subscribersExtensionName = "fm.subscribers";

  function base() {
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = base.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
  }


  /*<span id='method-fm.websync.subscribers.base-getSubscribedClients'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the subscribed clients.
  	 </div>
  	@function getSubscribedClients
  	@param {fm.websync.extensible} extensible The extensible base.
  	@return {Object} The subscribed clients.
   */

  base.getSubscribedClients = function() {
    var dictionary, extensible;
    extensible = arguments[0];
    dictionary = fm.websync.subscribers.serializer.deserializeSubscribedClients(extensible.getExtensionValueJson("fm.subscribers"));
    if (fm.global.equals(dictionary, null)) {
      throw new Error("Subscribed clients could not be parsed.");
    }
    return dictionary;
  };


  /*<span id='method-fm.websync.subscribers.base-setSubscribedClients'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the subscribed clients.
  	 </div>
  	@function setSubscribedClients
  	@param {fm.websync.extensible} extensible The extensible base.
  	@param {Object} subscribedClients The subscribed clients.
  	@return {void}
   */

  base.setSubscribedClients = function() {
    var extensible, subscribedClients;
    extensible = arguments[0];
    subscribedClients = arguments[1];
    return extensible.setExtensionValueJson("fm.subscribers", fm.websync.subscribers.serializer.serializeSubscribedClients(subscribedClients));
  };

  return base;

})(fm.object);



/*<span id='cls-fm.websync.subscribers.clientUnsubscribeArgs'>&nbsp;</span> */

/**
@class fm.websync.subscribers.clientUnsubscribeArgs
 <div>
 Arguments for the subscriber change callback.
 </div>

@extends fm.websync.baseSuccessArgs
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.subscribers.clientUnsubscribeArgs = (function(superClass) {
  extend(clientUnsubscribeArgs, superClass);

  clientUnsubscribeArgs.prototype.__channel = null;

  clientUnsubscribeArgs.prototype.__unsubscribedClient = null;


  /*<span id='method-fm.websync.subscribers.clientUnsubscribeArgs-fm.websync.subscribers.clientUnsubscribeArgs'>&nbsp;</span> */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.websync.subscribers.clientUnsubscribeArgs">fm.websync.subscribers.clientUnsubscribeArgs</see> class.
  	 </div>
  	@function fm.websync.subscribers.clientUnsubscribeArgs
  	@param {String} channel The channel.
  	@param {fm.websync.subscribedClient} unsubscribedClient The unsubscribed client.
  	@return {}
   */

  function clientUnsubscribeArgs() {
    this.getUnsubscribedClient = bind(this.getUnsubscribedClient, this);
    this.getChannel = bind(this.getChannel, this);
    var channel, instance, unsubscribedClient;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = clientUnsubscribeArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    channel = arguments[0];
    unsubscribedClient = arguments[1];
    instance = clientUnsubscribeArgs.__super__.constructor.call(this);
    this.__channel = channel;
    this.__unsubscribedClient = unsubscribedClient;
    return instance;
  }


  /*<span id='method-fm.websync.subscribers.clientUnsubscribeArgs-getChannel'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the channel on which the change occurred.
  	 </div>
  
  	@function getChannel
  	@return {String}
   */

  clientUnsubscribeArgs.prototype.getChannel = function() {
    return this.__channel;
  };


  /*<span id='method-fm.websync.subscribers.clientUnsubscribeArgs-getUnsubscribedClient'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the client who unsubscribed from the channel.
  	 </div>
  
  	@function getUnsubscribedClient
  	@return {fm.websync.subscribedClient}
   */

  clientUnsubscribeArgs.prototype.getUnsubscribedClient = function() {
    return this.__unsubscribedClient;
  };

  return clientUnsubscribeArgs;

})(fm.websync.baseSuccessArgs);


var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.subscribers.serializer = (function(superClass) {
  extend(serializer, superClass);

  function serializer() {
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = serializer.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = serializer.__super__.constructor.call(this);
    return instance;
  }

  serializer.createSubscribedClients = function() {
    return {};
  };

  serializer.createSubscriberChange = function() {
    return new fm.websync.subscribers.subscriberChange();
  };

  serializer.deserializeSubscribedClients = function() {
    var subscribedClientsJson;
    subscribedClientsJson = arguments[0];
    return fm.serializer.deserializeObject(subscribedClientsJson, serializer.createSubscribedClients, serializer.deserializeSubscribedClientsCallback);
  };

  serializer.deserializeSubscribedClientsCallback = function() {
    var name, subscribedClients, valueJson;
    subscribedClients = arguments[0];
    name = arguments[1];
    valueJson = arguments[2];
    return subscribedClients[name] = fm.websync.subscribedClient.fromJsonMultiple(valueJson);
  };

  serializer.deserializeSubscriberChange = function() {
    var subscriberChangeJson;
    subscriberChangeJson = arguments[0];
    return fm.serializer.deserializeObjectFast(subscriberChangeJson, serializer.createSubscriberChange, serializer.deserializeSubscriberChangeCallback);
  };

  serializer.deserializeSubscriberChangeCallback = function() {
    var name, str, subscriberChange, valueJson;
    subscriberChange = arguments[0];
    name = arguments[1];
    valueJson = arguments[2];
    str = name;
    if (!fm.global.equals(str, null)) {
      if (!(fm.global.equals(str, "client"))) {
        if (fm.global.equals(str, "type")) {
          return subscriberChange.setType(fm.websync.subscribers.serializer.deserializeSubscriberChangeType(valueJson));
        }
      } else {
        return subscriberChange.setClient(fm.websync.subscribedClient.fromJson(valueJson));
      }
    }
  };

  serializer.deserializeSubscriberChangeType = function() {
    var subscriberChangeTypeJson;
    subscriberChangeTypeJson = arguments[0];
    switch (fm.serializer.deserializeString(subscriberChangeTypeJson)) {
      case "subscribe":
        return fm.websync.subscribers.subscriberChangeType.Subscribe;
      case "unsubscribe":
        return fm.websync.subscribers.subscriberChangeType.Unsubscribe;
    }
    throw new Error("Unknown subscriber change type.");
  };

  serializer.serializeSubscribedClients = function() {
    var subscribedClients;
    subscribedClients = arguments[0];
    return fm.serializer.serializeObject(subscribedClients, serializer.serializeSubscribedClientsCallback);
  };

  serializer.serializeSubscribedClientsCallback = function() {
    var _var0, i, jsonObject, len, results, str, subscribedClients;
    subscribedClients = arguments[0];
    jsonObject = arguments[1];
    _var0 = fm.hashExtensions.getKeys(subscribedClients);
    results = [];
    for (i = 0, len = _var0.length; i < len; i++) {
      str = _var0[i];
      results.push(jsonObject[str] = fm.websync.subscribedClient.toJsonMultiple(subscribedClients[str]));
    }
    return results;
  };

  serializer.serializeSubscriberChange = function() {
    var subscriberChange;
    subscriberChange = arguments[0];
    return fm.serializer.serializeObjectFast(subscriberChange, serializer.serializeSubscriberChangeCallback);
  };

  serializer.serializeSubscriberChangeCallback = function() {
    var jsonObject, subscriberChange;
    subscriberChange = arguments[0];
    jsonObject = arguments[1];
    if (!fm.global.equals(subscriberChange.getClient(), null)) {
      jsonObject["client"] = fm.websync.subscribedClient.toJson(subscriberChange.getClient());
    }
    return jsonObject["type"] = fm.websync.subscribers.serializer.serializeSubscriberChangeType(subscriberChange.getType());
  };

  serializer.serializeSubscriberChangeType = function() {
    var str, subscriberChangeType;
    subscriberChangeType = arguments[0];
    switch (subscriberChangeType) {
      case fm.websync.subscribers.subscriberChangeType.Subscribe:
        str = "subscribe";
        break;
      case fm.websync.subscribers.subscriberChangeType.Unsubscribe:
        str = "unsubscribe";
        break;
      default:
        throw new Error("Unknown subscriber change type.");
    }
    return fm.serializer.serializeString(str);
  };

  return serializer;

})(fm.object);



/*<span id='cls-fm.websync.subscribers.subscribeArgsExtensions'>&nbsp;</span> */

/**
@class fm.websync.subscribers.subscribeArgsExtensions
 <div>
 <see cref="fm.websync.subscribeArgs">fm.websync.subscribeArgs</see> extension methods for the Subscribers extension.
 </div><div>
 <p>
 The subscribers extension provides support for initial state load and differential
 updates on the clients actively subscribed to the channel(s).
 </p>
 <p>
 The extension is activated by adding a reference to your project.
 </p>
 </div>
 */
fm.websync.subscribers.subscribeArgsExtensions = (function() {
  subscribeArgsExtensions._onClientSubscribePropertyName = null;

  subscribeArgsExtensions._onClientUnsubscribePropertyName = null;

  function subscribeArgsExtensions() {
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = subscribeArgsExtensions.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
  }

  subscribeArgsExtensions.client_OnReceive = function() {
    var action, action2, args2, args3, args4, change, dynamicValue, e, error, error1, exception, exception1, exception2, p;
    e = arguments[0];
    change = fm.websync.subscribers.serializer.deserializeSubscriberChange(e.getDataJson());
    if (!fm.guid.equals(change.getClient().getClientId(), e.getClient().getClientId())) {
      dynamicValue = fm.global.tryCastObject(e.getClient().getDynamicValue(fm.websync.subscribers.subscribeArgsExtensions.getDynamicPropertiesKey(e.getChannel())));
      if (fm.global.equals(change.getType(), fm.websync.subscribers.subscriberChangeType.Subscribe)) {
        action = fm.global.tryCast(e.getClient().getDynamicValue(fm.websync.subscribers.subscribeArgsExtensions.getOnClientSubscribeKey(e.getChannel())), Function);
        if (!fm.global.equals(action, null)) {
          args2 = new fm.websync.subscribers.clientSubscribeArgs(e.getChannel().substring("/fm/subscribers".length), change.getClient());
          args2.setTimestamp(e.getTimestamp());
          args2.setClient(e.getClient());
          args2.setDynamicProperties(dynamicValue);
          p = args2;
          p.copyExtensions(e);
          try {
            return action(p);
          } catch (error) {
            exception1 = error;
            exception = exception1;
            if (!e.getClient().raiseUnhandledException(exception)) {
              return fm.asyncException.asyncThrow(exception, "Client -> Subscribe -> OnClientSubscribe");
            }
          } finally {

          }
        }
      } else {
        action2 = fm.global.tryCast(e.getClient().getDynamicValue(fm.websync.subscribers.subscribeArgsExtensions.getOnClientUnsubscribeKey(e.getChannel())), Function);
        if (!fm.global.equals(action2, null)) {
          args4 = new fm.websync.subscribers.clientUnsubscribeArgs(e.getChannel().substring("/fm/subscribers".length), change.getClient());
          args4.setTimestamp(e.getTimestamp());
          args4.setClient(e.getClient());
          args4.setDynamicProperties(dynamicValue);
          args3 = args4;
          args3.copyExtensions(e);
          try {
            return action2(args3);
          } catch (error1) {
            exception2 = error1;
            exception = exception2;
            if (!e.getClient().raiseUnhandledException(exception)) {
              return fm.asyncException.asyncThrow(exception, "Client -> Subscribe -> OnClientUnsubscribe");
            }
          } finally {

          }
        }
      }
    }
  };

  subscribeArgsExtensions.client_OnSubscribeEnd = function() {
    var _var0, args, client, i, len, onClientSubscribe, onClientUnsubscribe, results, str, subscribersChannel;
    client = arguments[0];
    args = arguments[1];
    if (fm.global.equals(args.getException(), null)) {
      onClientSubscribe = fm.websync.subscribers.subscribeArgsExtensions.getOnClientSubscribe(args.getMethodArgs());
      onClientUnsubscribe = fm.websync.subscribers.subscribeArgsExtensions.getOnClientUnsubscribe(args.getMethodArgs());
      if ((!fm.global.equals(onClientSubscribe, null)) || (!fm.global.equals(onClientUnsubscribe, null))) {
        _var0 = args.getResponse().getChannels();
        results = [];
        for (i = 0, len = _var0.length; i < len; i++) {
          str = _var0[i];
          subscribersChannel = fm.stringExtensions.concat("/fm/subscribers", str);
          client.setDynamicValue(fm.websync.subscribers.subscribeArgsExtensions.getOnClientSubscribeKey(subscribersChannel), onClientSubscribe);
          client.setDynamicValue(fm.websync.subscribers.subscribeArgsExtensions.getOnClientUnsubscribeKey(subscribersChannel), onClientUnsubscribe);
          client.setDynamicValue(fm.websync.subscribers.subscribeArgsExtensions.getDynamicPropertiesKey(subscribersChannel), args.getMethodArgs().getDynamicProperties());
          results.push(args.getClient().setCustomOnReceive(subscribersChannel, subscribeArgsExtensions.client_OnReceive));
        }
        return results;
      }
    }
  };

  subscribeArgsExtensions.client_OnSubscribeRequest = function() {
    var _var0, args, client, i, len, list, onClientSubscribe, onClientUnsubscribe, str;
    client = arguments[0];
    args = arguments[1];
    onClientSubscribe = fm.websync.subscribers.subscribeArgsExtensions.getOnClientSubscribe(args.getMethodArgs());
    onClientUnsubscribe = fm.websync.subscribers.subscribeArgsExtensions.getOnClientUnsubscribe(args.getMethodArgs());
    if ((!fm.global.equals(onClientSubscribe, null)) || (!fm.global.equals(onClientUnsubscribe, null))) {
      list = [];
      _var0 = args.getMethodArgs().getChannels();
      for (i = 0, len = _var0.length; i < len; i++) {
        str = _var0[i];
        fm.arrayExtensions.add(list, str);
        fm.arrayExtensions.add(list, fm.stringExtensions.concat("/fm/subscribers", str));
      }
      return args.getMethodArgs().setChannels(fm.arrayExtensions.toArray(list));
    }
  };

  subscribeArgsExtensions.client_OnSubscribeResponse = function() {
    var _var0, args, client, i, len, list, str;
    client = arguments[0];
    args = arguments[1];
    if (fm.global.equals(args.getException(), null)) {
      list = [];
      _var0 = args.getResponse().getChannels();
      for (i = 0, len = _var0.length; i < len; i++) {
        str = _var0[i];
        if (!fm.stringExtensions.startsWith(str, "/fm/subscribers/")) {
          fm.arrayExtensions.add(list, str);
        }
      }
      args.getMethodArgs().setChannels(fm.arrayExtensions.toArray(list));
      return args.getResponse().setChannels(fm.arrayExtensions.toArray(list));
    }
  };

  subscribeArgsExtensions.client_OnUnsubscribeRequest = function() {
    var _var0, client, e, i, len, list, str;
    client = arguments[0];
    e = arguments[1];
    list = [];
    _var0 = e.getMethodArgs().getChannels();
    for (i = 0, len = _var0.length; i < len; i++) {
      str = _var0[i];
      fm.arrayExtensions.add(list, str);
      fm.arrayExtensions.add(list, fm.stringExtensions.concat("/fm/subscribers", str));
    }
    return e.getMethodArgs().setChannels(fm.arrayExtensions.toArray(list));
  };

  subscribeArgsExtensions.client_OnUnsubscribeResponse = function() {
    var _var0, _var1, client, e, i, j, len, len1, list, str;
    client = arguments[0];
    e = arguments[1];
    if (fm.global.equals(e.getException(), null)) {
      _var0 = e.getResponse().getChannels();
      for (i = 0, len = _var0.length; i < len; i++) {
        str = _var0[i];
        if (fm.stringExtensions.startsWith(str, "/fm/subscribers")) {
          e.getClient().unsetCustomOnReceive(str);
          e.getClient().unsetDynamicValue(fm.websync.subscribers.subscribeArgsExtensions.getOnClientSubscribeKey(str));
          e.getClient().unsetDynamicValue(fm.websync.subscribers.subscribeArgsExtensions.getOnClientUnsubscribeKey(str));
          e.getClient().unsetDynamicValue(fm.websync.subscribers.subscribeArgsExtensions.getDynamicPropertiesKey(str));
        }
      }
      list = [];
      _var1 = e.getResponse().getChannels();
      for (j = 0, len1 = _var1.length; j < len1; j++) {
        str = _var1[j];
        if (!fm.stringExtensions.startsWith(str, "/fm/subscribers/")) {
          fm.arrayExtensions.add(list, str);
        }
      }
      e.getMethodArgs().setChannels(fm.arrayExtensions.toArray(list));
      return e.getResponse().setChannels(fm.arrayExtensions.toArray(list));
    }
  };

  subscribeArgsExtensions.getDynamicPropertiesKey = function() {
    var subscribersChannel;
    subscribersChannel = arguments[0];
    return fm.stringExtensions.concat("fm.subscribers.dynamicProperties", subscribersChannel);
  };


  /*<span id='method-fm.websync.subscribers.subscribeArgsExtensions-getOnClientSubscribe'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the callback invoked when a client subscribes.
  	 </div>
  	@function getOnClientSubscribe
  	@param {fm.websync.subscribeArgs} args The fm.websync.subscribeArgs to extend.
  	@return {fm.singleAction} The callback invoked when a client subscribes.
   */

  subscribeArgsExtensions.getOnClientSubscribe = function() {
    var args;
    args = arguments[0];
    return args.getDynamicValue(fm.websync.subscribers.subscribeArgsExtensions._onClientSubscribePropertyName);
  };

  subscribeArgsExtensions.getOnClientSubscribeKey = function() {
    var subscribersChannel;
    subscribersChannel = arguments[0];
    return fm.stringExtensions.concat("fm.subscribers.onClientSubscribe", subscribersChannel);
  };


  /*<span id='method-fm.websync.subscribers.subscribeArgsExtensions-getOnClientUnsubscribe'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the callback invoked when a client unsubscribes.
  	 </div>
  	@function getOnClientUnsubscribe
  	@param {fm.websync.subscribeArgs} args The fm.websync.subscribeArgs to extend.
  	@return {fm.singleAction} The callback invoked when a client unsubscribes.
   */

  subscribeArgsExtensions.getOnClientUnsubscribe = function() {
    var args;
    args = arguments[0];
    return args.getDynamicValue(fm.websync.subscribers.subscribeArgsExtensions._onClientUnsubscribePropertyName);
  };

  subscribeArgsExtensions.getOnClientUnsubscribeKey = function() {
    var subscribersChannel;
    subscribersChannel = arguments[0];
    return fm.stringExtensions.concat("fm.subscribers.onClientUnsubscribe", subscribersChannel);
  };


  /*<span id='method-fm.websync.subscribers.subscribeArgsExtensions-setOnClientSubscribe'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets a callback to invoke when a client subscribes.
  	 </div>
  	@function setOnClientSubscribe
  	@param {fm.websync.subscribeArgs} args The fm.websync.subscribeArgs to extend.
  	@param {fm.singleAction} onClientSubscribe The callback to invoke when a client subscribes to
  	 the channel(s)).
  	@return {fm.websync.subscribeArgs} The fm.websync.subscribeArgs.
   */

  subscribeArgsExtensions.setOnClientSubscribe = function() {
    var args, onClientSubscribe;
    args = arguments[0];
    onClientSubscribe = arguments[1];
    args.setDynamicValue(fm.websync.subscribers.subscribeArgsExtensions._onClientSubscribePropertyName, onClientSubscribe);
    return args;
  };


  /*<span id='method-fm.websync.subscribers.subscribeArgsExtensions-setOnClientUnsubscribe'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets a callback to invoke when a client unsubscribes.
  	 </div>
  	@function setOnClientUnsubscribe
  	@param {fm.websync.subscribeArgs} args The fm.websync.subscribeArgs to extend.
  	@param {fm.singleAction} onClientUnsubscribe The callback to invoke when a client unsubscribes from
  	 the channel(s)).
  	@return {fm.websync.subscribeArgs} The fm.websync.subscribeArgs.
   */

  subscribeArgsExtensions.setOnClientUnsubscribe = function() {
    var args, onClientUnsubscribe;
    args = arguments[0];
    onClientUnsubscribe = arguments[1];
    args.setDynamicValue(fm.websync.subscribers.subscribeArgsExtensions._onClientUnsubscribePropertyName, onClientUnsubscribe);
    return args;
  };


  /*<span id='method-fm.websync.subscribers.subscribeArgsExtensions-getOnClientSubscribe'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the callback invoked when a client subscribes.
  	 </div>
  	@function getOnClientSubscribe
  	@return {fm.singleAction} The callback invoked when a client subscribes.
   */

  fm.websync.subscribeArgs.prototype.getOnClientSubscribe = function() {
    Array.prototype.splice.call(arguments, 0, 0, this);
    return fm.websync.subscribers.subscribeArgsExtensions.getOnClientSubscribe.apply(this, arguments);
  };


  /*<span id='method-fm.websync.subscribers.subscribeArgsExtensions-getOnClientUnsubscribe'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the callback invoked when a client unsubscribes.
  	 </div>
  	@function getOnClientUnsubscribe
  	@return {fm.singleAction} The callback invoked when a client unsubscribes.
   */

  fm.websync.subscribeArgs.prototype.getOnClientUnsubscribe = function() {
    Array.prototype.splice.call(arguments, 0, 0, this);
    return fm.websync.subscribers.subscribeArgsExtensions.getOnClientUnsubscribe.apply(this, arguments);
  };


  /*<span id='method-fm.websync.subscribers.subscribeArgsExtensions-setOnClientSubscribe'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets a callback to invoke when a client subscribes.
  	 </div>
  	@function setOnClientSubscribe
  	@param {fm.singleAction} onClientSubscribe The callback to invoke when a client subscribes to
  	 the channel(s)).
  	@return {fm.websync.subscribeArgs} The fm.websync.subscribeArgs.
   */

  fm.websync.subscribeArgs.prototype.setOnClientSubscribe = function() {
    var onClientSubscribe;
    onClientSubscribe = arguments[0];
    Array.prototype.splice.call(arguments, 0, 0, this);
    return fm.websync.subscribers.subscribeArgsExtensions.setOnClientSubscribe.apply(this, arguments);
  };


  /*<span id='method-fm.websync.subscribers.subscribeArgsExtensions-setOnClientUnsubscribe'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets a callback to invoke when a client unsubscribes.
  	 </div>
  	@function setOnClientUnsubscribe
  	@param {fm.singleAction} onClientUnsubscribe The callback to invoke when a client unsubscribes from
  	 the channel(s)).
  	@return {fm.websync.subscribeArgs} The fm.websync.subscribeArgs.
   */

  fm.websync.subscribeArgs.prototype.setOnClientUnsubscribe = function() {
    var onClientUnsubscribe;
    onClientUnsubscribe = arguments[0];
    Array.prototype.splice.call(arguments, 0, 0, this);
    return fm.websync.subscribers.subscribeArgsExtensions.setOnClientUnsubscribe.apply(this, arguments);
  };

  subscribeArgsExtensions._onClientSubscribePropertyName = "fm.subscribers.onClientSubscribe";

  subscribeArgsExtensions._onClientUnsubscribePropertyName = "fm.subscribers.onClientUnsubscribe";

  fm.websync.client.addOnSubscribeRequest(subscribeArgsExtensions.client_OnSubscribeRequest);

  fm.websync.client.addOnSubscribeResponse(subscribeArgsExtensions.client_OnSubscribeResponse);

  fm.websync.client.addOnSubscribeEnd(subscribeArgsExtensions.client_OnSubscribeEnd);

  fm.websync.client.addOnUnsubscribeRequest(subscribeArgsExtensions.client_OnUnsubscribeRequest);

  fm.websync.client.addOnUnsubscribeResponse(subscribeArgsExtensions.client_OnUnsubscribeResponse);

  return subscribeArgsExtensions;

})();



/*<span id='cls-fm.websync.subscribers.subscriberChange'>&nbsp;</span> */

/**
@class fm.websync.subscribers.subscriberChange
 <div>
 A description of a subscriber change on a channel, either a new
 subscriber entering or an existing subscriber leaving.
 </div>

@extends fm.serializable
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.subscribers.subscriberChange = (function(superClass) {
  extend(subscriberChange, superClass);

  subscriberChange.prototype.__client = null;

  subscriberChange.prototype.__type = null;

  function subscriberChange() {
    this.toJson = bind(this.toJson, this);
    this.setType = bind(this.setType, this);
    this.setClient = bind(this.setClient, this);
    this.getType = bind(this.getType, this);
    this.getClient = bind(this.getClient, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = subscriberChange.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = subscriberChange.__super__.constructor.call(this);
    return instance;
  }


  /*<span id='method-fm.websync.subscribers.subscriberChange-fromJson'>&nbsp;</span> */


  /**
  	 <div>
  	 Deserializes a subscriber change object from JSON.
  	 </div>
  	@function fromJson
  	@param {String} subscriberChangeJson A JSON string to deserialize.
  	@return {fm.websync.subscribers.subscriberChange} The deserialized subscriber change object.
   */

  subscriberChange.fromJson = function() {
    var subscriberChangeJson;
    subscriberChangeJson = arguments[0];
    return fm.websync.subscribers.serializer.deserializeSubscriberChange(subscriberChangeJson);
  };


  /*<span id='method-fm.websync.subscribers.subscriberChange-toJson'>&nbsp;</span> */


  /**
  	 <div>
  	 Serializes a subscriber change object to JSON.
  	 </div>
  	@function toJson
  	@param {fm.websync.subscribers.subscriberChange} subscriberChange A subscriber change object to serialize.
  	@return {String} The serialized subscriber change object.
   */

  subscriberChange.toJson = function() {
    var subscriberChange;
    subscriberChange = arguments[0];
    return fm.websync.subscribers.serializer.serializeSubscriberChange(subscriberChange);
  };


  /*<span id='method-fm.websync.subscribers.subscriberChange-getClient'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the client who subscribed to or unsubscribed from the channel.
  	 </div>
  
  	@function getClient
  	@return {fm.websync.subscribedClient}
   */

  subscriberChange.prototype.getClient = function() {
    return this.__client;
  };


  /*<span id='method-fm.websync.subscribers.subscriberChange-getType'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the type of the subscriber change, either subscribe or unsubscribe.
  	 </div>
  
  	@function getType
  	@return {fm.websync.subscribers.subscriberChangeType}
   */

  subscriberChange.prototype.getType = function() {
    return this.__type;
  };


  /*<span id='method-fm.websync.subscribers.subscriberChange-setClient'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the client who subscribed to or unsubscribed from the channel.
  	 </div>
  
  	@function setClient
  	@param {fm.websync.subscribedClient} value
  	@return {void}
   */

  subscriberChange.prototype.setClient = function() {
    var value;
    value = arguments[0];
    this.setIsDirty(true);
    return this.__client = value;
  };


  /*<span id='method-fm.websync.subscribers.subscriberChange-setType'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the type of the subscriber change, either subscribe or unsubscribe.
  	 </div>
  
  	@function setType
  	@param {fm.websync.subscribers.subscriberChangeType} value
  	@return {void}
   */

  subscriberChange.prototype.setType = function() {
    var value;
    value = arguments[0];
    this.setIsDirty(true);
    return this.__type = value;
  };


  /*<span id='method-fm.websync.subscribers.subscriberChange-toJson'>&nbsp;</span> */


  /**
  	 <div>
  	 Serializes the subscriber change object to JSON.
  	 </div>
  	@function toJson
  	@return {String} The serialized subscriber change object.
   */

  subscriberChange.prototype.toJson = function() {
    return fm.websync.subscribers.subscriberChange.toJson(this);
  };

  return subscriberChange;

})(fm.serializable);



/*<span id='cls-fm.websync.subscribers.clientSubscribeArgs'>&nbsp;</span> */

/**
@class fm.websync.subscribers.clientSubscribeArgs
 <div>
 Arguments for the subscriber change callback.
 </div>

@extends fm.websync.baseSuccessArgs
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.subscribers.clientSubscribeArgs = (function(superClass) {
  extend(clientSubscribeArgs, superClass);

  clientSubscribeArgs.prototype.__channel = null;

  clientSubscribeArgs.prototype.__subscribedClient = null;


  /*<span id='method-fm.websync.subscribers.clientSubscribeArgs-fm.websync.subscribers.clientSubscribeArgs'>&nbsp;</span> */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.websync.subscribers.clientSubscribeArgs">fm.websync.subscribers.clientSubscribeArgs</see> class.
  	 </div>
  	@function fm.websync.subscribers.clientSubscribeArgs
  	@param {String} channel The channel.
  	@param {fm.websync.subscribedClient} subscribedClient The subscribed client.
  	@return {}
   */

  function clientSubscribeArgs() {
    this.getSubscribedClient = bind(this.getSubscribedClient, this);
    this.getChannel = bind(this.getChannel, this);
    var channel, instance, subscribedClient;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = clientSubscribeArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    channel = arguments[0];
    subscribedClient = arguments[1];
    instance = clientSubscribeArgs.__super__.constructor.call(this);
    this.__channel = channel;
    this.__subscribedClient = subscribedClient;
    return instance;
  }


  /*<span id='method-fm.websync.subscribers.clientSubscribeArgs-getChannel'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the channel on which the change occurred.
  	 </div>
  
  	@function getChannel
  	@return {String}
   */

  clientSubscribeArgs.prototype.getChannel = function() {
    return this.__channel;
  };


  /*<span id='method-fm.websync.subscribers.clientSubscribeArgs-getSubscribedClient'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the client who subscribed to the channel.
  	 </div>
  
  	@function getSubscribedClient
  	@return {fm.websync.subscribedClient}
   */

  clientSubscribeArgs.prototype.getSubscribedClient = function() {
    return this.__subscribedClient;
  };

  return clientSubscribeArgs;

})(fm.websync.baseSuccessArgs);



/*<span id='cls-fm.websync.subscribers.subscribeSuccessArgsExtensions'>&nbsp;</span> */

/**
@class fm.websync.subscribers.subscribeSuccessArgsExtensions
 <div>
 <see cref="fm.websync.subscribeSuccessArgs">fm.websync.subscribeSuccessArgs</see> extension methods for the Subscribers extension.
 </div><div>
 <p>
 The subscribers extension provides support for initial state load and differential
 updates on the clients actively subscribed to the channel(s).
 </p>
 <p>
 The extension is activated by adding a reference to your project.
 </p>
 </div>
 */
fm.websync.subscribers.subscribeSuccessArgsExtensions = (function() {
  function subscribeSuccessArgsExtensions() {
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = subscribeSuccessArgsExtensions.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
  }


  /*<span id='method-fm.websync.subscribers.subscribeSuccessArgsExtensions-getSubscribedClients'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the active subscribed clients on the just-subscribed channel(s).
  	 </div>
  	@function getSubscribedClients
  	@param {fm.websync.subscribeSuccessArgs} args The fm.websync.subscribeSuccessArgs to extend.
  	@return {Object} The subscribed clients, partitioned by channel.
   */

  subscribeSuccessArgsExtensions.getSubscribedClients = function() {
    var args;
    args = arguments[0];
    return fm.websync.subscribers.base.getSubscribedClients(args);
  };


  /*<span id='method-fm.websync.subscribers.subscribeSuccessArgsExtensions-getSubscribedClients'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the active subscribed clients on the just-subscribed channel(s).
  	 </div>
  	@function getSubscribedClients
  	@return {Object} The subscribed clients, partitioned by channel.
   */

  fm.websync.subscribeSuccessArgs.prototype.getSubscribedClients = function() {
    Array.prototype.splice.call(arguments, 0, 0, this);
    return fm.websync.subscribers.subscribeSuccessArgsExtensions.getSubscribedClients.apply(this, arguments);
  };

  return subscribeSuccessArgsExtensions;

})();


return fm.websync.subscribers;
}));