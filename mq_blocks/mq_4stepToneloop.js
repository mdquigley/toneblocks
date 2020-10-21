Blockly.Blocks['mq_4stepToneloop'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('loop')
        this.appendDummyInput()
            .appendField('subdivision')
            .appendField(new Blockly.FieldDropdown([["1n", "1n"], ["2n", "2n"], ["4n", "4n"], ["8n", "8n"], ["16n", "16n"]]), "subdivision");
        this.setFieldValue("4n", 'subdivision');
        this.appendValueInput('PITCH1')
            .setCheck('Number')
            .appendField('Note 1');
        this.appendValueInput('PITCH2')
            .setCheck('Number')
            .appendField('Note 2');
        this.appendValueInput('PITCH3')
            .setCheck('Number')
            .appendField('Note 3');
        this.appendValueInput('PITCH4')
            .setCheck('Number')
            .appendField('Note 4');
        this.setPreviousStatement(true, null);
        this.setOutput(false);
        this.setColour(210);
    }
};

Blockly.JavaScript['mq_4stepToneloop'] = function (block) {
    let note1 = Blockly.JavaScript.valueToCode(block, 'PITCH1', Blockly.JavaScript.ORDER_FUNCTION_CALL) || null;
    let note2 = Blockly.JavaScript.valueToCode(block, 'PITCH2', Blockly.JavaScript.ORDER_FUNCTION_CALL) || null;
    let note3 = Blockly.JavaScript.valueToCode(block, 'PITCH3', Blockly.JavaScript.ORDER_FUNCTION_CALL) || null;
    let note4 = Blockly.JavaScript.valueToCode(block, 'PITCH4', Blockly.JavaScript.ORDER_FUNCTION_CALL) || null;
    let subdivision = block.getFieldValue('subdivision');

    let code = "";
    let synth;

    const topBlock = block.getTopStackBlock();
    if (topBlock) {
        let synthName = topBlock.getFieldValue('name');
        synth = synthList[synthName];
    }

    synth.subdivision = subdivision;
    synth.sequence = [(note1 ? note1 : null), (note2 ? note2 : null), (note3 ? note3 : null), (note4 ? note4 : null)];

    let loop = new Tone.Loop((time) => {
        synth.updateOsc();
        if (synth.sequence[synth.currentCount] !== null) {
            synth.synth.triggerAttackRelease(synth.sequence[synth.currentCount] ? Tone.Frequency(synth.sequence[synth.currentCount], 'midi') : null, '8n');
        }
        synth.currentCount = (synth.currentCount + 1) % synth.maxCount;

    }, synth.subdivision).start(+0.05);





    return code;
};