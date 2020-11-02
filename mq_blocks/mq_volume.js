Blockly.Blocks['mq_volume'] = {
    init: function () {
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

Blockly.JavaScript['mq_volume'] = function (block) {
    let volume = Blockly.JavaScript.valueToCode(block, 'volume', Blockly.JavaScript.ORDER_FUNCTION_CALL) || 100;
    let code = "";
    let synth;

    const topBlock = block.getTopStackBlock();
    if (topBlock) {
        synth = topBlock.getFieldValue('name');
    }
    vols[synth] = volume;


    code = ``;

    return code;
};