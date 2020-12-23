Blockly.Blocks['mq_ampenv'] = {
    init: function () {
        this.appendValueInput('attack')
            .setCheck('Number')
            .appendField('attack');
        this.appendValueInput('decay')
            .setCheck('Number')
            .appendField('decay');
        this.appendValueInput('sustain')
            .setCheck('Number')
            .appendField('sustain');
        this.appendValueInput('release')
            .setCheck('Number')
            .appendField('release');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setOutput(false);
	this.setStyle("music_blocks");    
}
};

Blockly.JavaScript['mq_ampenv'] = function (block) {
    let attack = Blockly.JavaScript.valueToCode(block, 'attack', Blockly.JavaScript.ORDER_FUNCTION_CALL) || 0.005;
    let decay = Blockly.JavaScript.valueToCode(block, 'decay', Blockly.JavaScript.ORDER_FUNCTION_CALL) || 0.1;
    let sustain = Blockly.JavaScript.valueToCode(block, 'sustain', Blockly.JavaScript.ORDER_FUNCTION_CALL) || 0.3;
    let release = Blockly.JavaScript.valueToCode(block, 'release', Blockly.JavaScript.ORDER_FUNCTION_CALL) || 1;
    let code = "";
    let synth;

    console.log(attack);

    const topBlock = block.getTopStackBlock();
    if (topBlock) {
        synth = topBlock.getFieldValue('name');
    }

    ampenvs[synth] = {
        envelope: {
            attack: parseFloat(eval(attack)),
            decay: parseFloat(eval(decay)),
            sustain: parseFloat(eval(sustain)),
            release: parseFloat(eval(release))
        }
    }


    if (synth == null) {
        code = ``;
    } else {

        code = `
             function ${synth}AmpEnv() {
                ${synth}.set(ampenvs['${synth}']);
             }
            ${synth}.set({envelope: {
                attack: eval(${attack}),
                decay: eval(${decay}),
                sustain: eval(${sustain}),
                release: eval(${release})
            }});
            `;
    }


    return code;
};
