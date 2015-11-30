sap.ui.define([
	'sap/ui/core/Renderer',
	'{%= parent.control.renderer.require %}'
], function (
	Renderer, 
	{%= parent.control.renderer.name %}
) {
	'use strict';

	var {%= control.renderer.name %} = Renderer.extend({%= parent.control.renderer.name %});

	//{%= control.renderer.name %}.renderContent = function (rm, control) {
	//	rm.renderControl(control);
	//};

	return {%= control.renderer.name %};

}, true);
