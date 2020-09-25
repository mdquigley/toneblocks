Blockly.Blocks['mq_step'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Step");
        this.appendValueInput("pitch")
            .setCheck(["Number", "-"])
            .appendField("Pitch");
        this.appendValueInput("velocity")
            .setCheck("Number")
            .appendField("Velocity");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['mq_step'] = function (block) {
    const pitch = Blockly.JavaScript.valueToCode(block, 'pitch', Blockly.JavaScript.ORDER_ATOMIC);
    const velocity = Blockly.JavaScript.valueToCode(block, 'velocity', Blockly.JavaScript.ORDER_ATOMIC);

    let synthName = block.getTopStackBlock().getFieldValue('name');

    const code = `${synthName}Seq.push(${pitch});\n`;


    return code;
};