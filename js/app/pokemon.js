'use strict'

define(["settings", "app/socket"], function(settings, socket) {

    var settings = {};
    var enabledActions = {};
    
    var actions = {
        releasePokemon: {
            button: function(pokemon, user_id){
                return '<a href="#!" onClick="pokemonActions.releasePokemon.action(\''+pokemon.unique_id+'\')">Release</a>';
            },
            action: function(id){
                if(confirm("Are you sure you want to release this pokemon? THIS CANNOT BE UNDONE!")){
                    socket.emit('user_action', {'event':'release_pokemon', data: {'pokemon_id': id}});
                }
            }
        },

        evolvePokemon: {
            button: function(pokemon, user_id){
                var pkmnData = mapView.pokemonArray[pokemon.id - 1],
                    candy = mapView.getCandy(pokemon.id, user_id),
                    canEvolve = false;
                if("undefined" != typeof pkmnData['Next evolution(s)'] && "undefined" != typeof pkmnData['Next Evolution Requirements']){
                    canEvolve = (candy >= pkmnData['Next Evolution Requirements']['Amount'])
                }
                return (canEvolve ? '<a href="#!" onClick="pokemonActions.evolvePokemon.action(\''+pokemon.unique_id+'\')">Evolve</a>' : false);
            },
            action: function(id){
                if(confirm("Are you sure you want to evolve this pokemon? THIS CANNOT BE UNDONE!")){
                    socket.emit('user_action', {'event':'evolve_pokemon', data: {'pokemon_id': id}});
                }
            }
        }
    };

    for(var i in actions){
        if(settings.actionsEnabled === true){
            enabledActions[i] = actions[i];
        } else if(Array.isArray(settings.actionsEnabled)){
            if (settings.actionsEnabled.indexOf(i) !== -1){
                enabledActions[i] = actions[i];
            }
        }
    }

    return enabledActions;
});
