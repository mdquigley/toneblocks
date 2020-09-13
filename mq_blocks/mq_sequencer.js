Blockly.Blocks['mq_sequencer'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Sequencer");
        this.appendValueInput('NAME')
            .setCheck('String')
            .appendField('Name');
        this.appendValueInput('VALUE1')
            .setCheck('Number')
            .appendField('Note 1');
        this.appendValueInput('VALUE2')
            .setCheck('Number')
            .appendField('Note 2');
        this.appendValueInput('VALUE3')
            .setCheck('Number')
            .appendField('Note 3');
        this.appendValueInput('VALUE4')
            .setCheck('Number')
            .appendField('Note 4');

        this.setOutput(false);
        this.setColour(160);
    }
};

Blockly.JavaScript['mq_sequencer'] = function (block) {
    let note1 = Blockly.JavaScript.valueToCode(block, 'VALUE1', Blockly.JavaScript.ORDER_FUNCTION_CALL) || '\'\'';
    let note2 = Blockly.JavaScript.valueToCode(block, 'VALUE2', Blockly.JavaScript.ORDER_FUNCTION_CALL) || '\'\'';
    let note3 = Blockly.JavaScript.valueToCode(block, 'VALUE3', Blockly.JavaScript.ORDER_FUNCTION_CALL) || '\'\'';
    let note4 = Blockly.JavaScript.valueToCode(block, 'VALUE4', Blockly.JavaScript.ORDER_FUNCTION_CALL) || '\'\'';
    let synthName = (Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_FUNCTION_CALL) || '\'\'').replace(/'/g, '');

    // generate synth with supplied name
    // generate sequence with supplied notes in MIDI notation
    // add event listener to stop button (created in main file) to dispose of synth on stop
    const code = `const ${synthName} = new Tone.Synth().toDestination();
const ${synthName}Seq = new Tone.Sequence((time, note) => {
${synthName}.triggerAttackRelease(note, "8n", time);
}, [Tone.Frequency(${note1}, "midi"), Tone.Frequency(${note2}, "midi"), Tone.Frequency(${note3}, "midi"), Tone.Frequency(${note4}, "midi")]).start(0);
run.addEventListener('click', () => {
    ${synthName}.dispose();
});`;
    return code;
};