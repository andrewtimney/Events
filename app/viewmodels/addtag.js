define(['knockout', 'plugins/dialog', 'data/context', 'durandal/app'],
    function(ko, dialog, datacontext, app){

        var ctor = {
            name: ko.observable().extend({
              required:{
                  message: 'Name is required',
                  params: true
              }
            }),
            submit: function(){
                this.errors.showAllMessages();
                if(this.isValid()){
                    datacontext.tag.add(this.name())
                        .then(function(tag){
                            app.trigger('app:success', 'New Tag', 'Yay, a new tag was added!');
                        });
                }
            },
            cancel: function(){
                dialog.close(this);
                this.reset();
            },
            reset: function(){
                this.name(null);
                this.errors.showAllMessages(false);
            }
        };
        ctor.errors = ko.validation.group(ctor);
        return ctor;
    });