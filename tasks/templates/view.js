sap.ui.jsview('{%= namespace %}view.{%= name %}', {

    getControllerName: function() {
        return '{%= namespace %}controller.{%= name %}';
    },

    createContent: function(controller) {

        var page = new sap.m.Page({
            title: ''
        });

        return page;
    }

});
