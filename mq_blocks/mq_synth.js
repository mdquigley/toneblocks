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
    const waveType = block.getFieldValue('wavetype');
    synths[synthName] = waveType;

    const code = `const ${synthName} = new Tone.Synth({oscillator: {type: '${synths[synthName]}'}}).toDestination();
    
    function ${synthName}ChangeType() {
        if (${synthName}.oscillator.type !== synths['${synthName}']) {
            ${synthName}.set({oscillator: {type: synths['${synthName}']}});
        }
    }
    setInterval(${synthName}ChangeType, 1000);

    run.addEventListener('click', () => {
        ${synthName}.dispose();
    });\n`;
    return code;
};