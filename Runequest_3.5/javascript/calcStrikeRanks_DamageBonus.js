    on("change:dex change:dex_enchant change:siz change:siz_enchant change:str change:str_enchant change:pow change:pow_enchant change:app change:app_enchant change:con change:con_enchant", function() {
        console.log("***** start dex strike rank *****");
        getAttrs(["dex", "dex_enchant", "siz", "siz_enchant", "str", "str_enchant", "pow", "pow_enchant", "app", "app_enchant", "con", "con_enchant"], function(pvalue) {
				console.log("current dex value: " + pvalue.dex);
				console.log("dex enchant value: " + pvalue.dex_enchant);
        		console.log("current siz value: " + pvalue.siz);
				console.log("siz enchant value: " + pvalue.siz_enchant);
                console.log("current str value: " + pvalue.str);
				console.log("str enchant value: " + pvalue.str_enchant);

				let totalSiz = parseInt(pvalue.siz) + parseInt(pvalue.siz_enchant);
	            let totalDex = parseInt(pvalue.dex) + parseInt(pvalue.dex_enchant);
	            let totalStr = parseInt(pvalue.str) + parseInt(pvalue.str_enchant);
	            let damage = totalSiz + totalStr;
                let update = {};

	            update['str_secondary'] = Math.ceil((parseInt(pvalue.str) + parseInt(pvalue.str_enchant)-10)/2);
	            if (update['str_secondary'] > 20) {
	                update['str_secondary'] = 20;
                }

	            update['con_secondary'] = Math.ceil((parseInt(pvalue.con) + parseInt(pvalue.con_enchant)-10)/2);
	            if (update['con_secondary'] > 20) {
	                update['con_secondary'] = 20;
                }

	            update['pow_secondary'] = Math.ceil((parseInt(pvalue.pow) + parseInt(pvalue.pow_enchant)-10)/2);
	            if (update['pow_secondary'] > 20) {
	                update['pow_secondary'] = 20;
                }

	            update['dex_secondary'] = Math.ceil((parseInt(pvalue.dex) + parseInt(pvalue.dex_enchant)-10)/2);
	            if (update['dex_secondary'] > 20) {
	                update['dex_secondary'] = 20;
                }

	            update['app_secondary'] = Math.ceil((parseInt(pvalue.app) + parseInt(pvalue.app_enchant)-10)/2);
	            if (update['app_secondary'] > 20) {
	                update['app_secondary'] = 20;
                }

	            update['meleemod_dice'] = 0;
	            update['meleemod_sides'] = 6;

                if (damage < 13) {
                    update['missiledmod'] = '-1d8';
                    update['meleemod_dice'] = -1;
                    update['meleemod_sides'] = 4;
                } else if (damage > 71 ) {
                    damage = damage - 71;

                    let multiplier = floor(damage / 16);
                    damage = 4 + multiplier;
                    update['meleemod_dice'] = damage;
                    update['missiledmod'] = '+' + damage + 'd3';
                } else if (damage > 56) {
                    update['meleemod_dice'] = 3;
                    update['missiledmod'] = '+3d3';
                } else if (damage > 40) {
                    update['meleemod_dice'] = 2;
                    update['missiledmod'] = '+2d3';
                } else if (damage > 32) {
                    update['meleemod_dice'] = 1;
                    update['missiledmod'] = '+1d3';
                } else if (damage > 24) {
                    update['meleemod_dice'] = 1;
                    update['meleemod_sides'] = 4;
                    update['missiledmod'] = '+1d2';
                } else {
                    update['missiledmod'] = '0';
                }

                if (update['meleemod_dice'] == 0) {
                    update['damagemod'] = 0;
                } else {
                    update['damagemod'] = update['meleemod_dice'] + 'd' + update['meleemod_sides'];
                }

	            if (totalDex > 19) {
                    console.log("Dex SR is 1");
                    update['dexsr'] = 1;
                } else if (totalDex > 15) {
                    console.log("Dex SR is 2");
                    update['dexsr'] = 2;
                } else if (totalDex > 9) {
                    console.log("Dex SR is 3");
                    update['dexsr'] = 3;
                } else {
	                update['dexsr'] = 4;
                }

	            if (totalSiz > 19) {
                    console.log("Size SR is 0");
                    update['sizsr'] = 0;
                } else if (totalSiz > 15) {
                    console.log("Size SR is 1");
                    update['sizsr'] = 1;
                } else if (totalSiz > 9) {
                    console.log("Size SR is 2");
                    update['sizsr'] = 2;
                } else {
	                update['sizsr'] = 3;
                }

	            update['meleesr'] = update['sizsr'] + update['dexsr'];

                console.log("Setting dexsr to " + update['dexsr']);
                console.log("Setting sizsr to " + update['sizsr']);
                console.log("Setting dexsr to " + update['meleesr']);
                setAttrs(update);
				});

        console.log("***** End Dex SR *****");
    });
