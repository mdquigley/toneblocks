Blockly.Blocks['mq_instrument'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("instrument")
            .appendField(new Blockly.FieldDropdown([["piano", "piano"], ["casio", "casio"], ["drum", "drum"]]), "instrument");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setOutput(false);
        this.setColour(160);
    }
};

Blockly.JavaScript['mq_instrument'] = function (block) {
    let dropdown_instrument = block.getFieldValue('instrument');

    let code = `//${dropdown_instrument} loaded\n`;

    return code;
};