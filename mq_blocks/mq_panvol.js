Blockly.Blocks['mq_panvol'] = {
    init: function () {
        this.appendValueInput('pan')
            .setCheck('Number')
            .appendField('pan');
        this.appendValueInput('volume')
            .setCheck('Number')
            .appendField('volume');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setOutput(false);
        this.setColour(160);
    }
};

Blockly.JavaScript['mq_panvol'] = function (block) {
    let pan = Blockly.JavaScript.valueToCode(block, 'pan', Blockly.JavaScript.ORDER_FUNCTION_CALL) || 0;
    let volume = Blockly.JavaScript.valueToCode(block, 'volume', Blockly.JavaScript.ORDER_FUNCTION_CALL) || -6;
    let code = "";
    let synth;

    const topBlock = block.getTopStackBlock();
    if (topBlock) {
        synth = topBlock.getFieldValue('name');
    }

    panvols[synth] = {
        pan: parseFloat(eval(pan)),
        volume: parseFloat(eval(volume))

    }


    if (synth == null) {
        code = ``;
    } else {

        code = `
             function ${synth}ChangePanVol() {
                ${synth}PanVol.set(panvols['${synth}']);
             }

             let ${synth}PanVol = new Tone.PanVol(eval(${pan}), eval(${volume})).toDestination();
             ${synth}.disconnect();
             ${synth}.connect(${synth}PanVol);
            `;
    }


    return code;
};