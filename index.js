/*jshint esversion: 6 */

(function(){
	'use strict';

	module.exports = (pluginContext) => {

		const shell = pluginContext.shell;

		function search(query, res) {
			const query_trim = query.trim();

			if (query_trim.length === 0) {
	      		return res.add({
	      			id: "helpText",
	      			title: "Setting countdown timer for: ",
	      			desc: "Usage: /countdown [hours]:[minutes]"
	      		});
	    	}

	    	const query_split = query.split(":");

	    	var hours = 0;
	    	var minutes = 0;

	    	hours = Number(query_split[0].trim());

	    	if(Number.isNaN(hours)){
	    		return res.add({
	    			id: "error",
	    			title: "Invalid countdown time",
	    			desc: "Usage: /countdown [hours]:[minutes]"
	    		});
	    	}

	    	if(query_split.length >= 2){
	    		
	    		minutes = Number(query_split[1].trim());

	    		if(Number.isNaN(minutes)){
	    			return res.add({
		    			id: "error",
		    			title: "Invalid countdown time",
		    			desc: "Usage: /countdown [hours]:[minutes]"
		    		});
	    		}
	    	}

			res.add({
				id: "cd",
				payload: hours + "h" + minutes + "m",
				title: "Setting countdown timer for: " + hours + " hours and " + minutes + " minutes",
				desc: "Usage: /countdown [hours]:[minutes]"
			});
		}

		function execute(id, payload){
			if(id === "cd"){
				shell.openExternal('http://cd.justinjc.com/' + payload);
			}
		}

		return { search, execute };

	};
})();