App.ItemRoute = Ember.Route.extend({
	model:function(params){
		return Api.getItem(params.iid);
	}
});

App.ItemController = Ember.ObjectController.extend({

});