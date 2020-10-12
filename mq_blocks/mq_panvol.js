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
        pan: pan,
        volume: volume

    }


    if (synth == null) {
        code = ``;
    } else {

        code = `
            function ${synth}ChangePanVol() {
                 ${synth}PanVol.set({pan: eval(panvols['${synth}']['pan']), volume: eval(panvols['${synth}']['volume'])});
            }

             let ${synth}PanVol = new Tone.PanVol(eval(panvols['${synth}']['pan']), eval(panvols['${synth}']['volume'])).toDestination();
             ${synth}.disconnect();
             ${synth}.connect(${synth}PanVol);
            `;
    }


    return code;
};