Blockly.Blocks['mq_synth'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Synth");
        this.appendDummyInput()
            .appendField("enter unique name")
            .appendField(new Blockly.FieldTextInput("synth1"), "name");
        this.appendDummyInput()
            .appendField("wave type")
            .appendField(new Blockly.FieldDropdown([["sine", "sine"], ["square", "square"], ["triangle", "triangle"]]), "wavetype");
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['mq_synth'] = function (block) {
    const synthName = block.getFieldValue('name');
    const wavetype = block.getFieldValue('wavetype');

    const code = `const ${synthName} = new Tone.Synth().toDestination();
    ${synthName}.set({
        oscillator: {
            type: '${wavetype}'
        }
    });
    run.addEventListener('click', () => {
        ${synthName}.dispose();
    });\n`;
    return code;
};