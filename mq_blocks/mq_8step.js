Blockly.Blocks['mq_8step'] = {
    init: function () {
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
        this.appendValueInput('PITCH5')
            .setCheck('Number')
            .appendField('Note 5');
        this.appendValueInput('PITCH6')
            .setCheck('Number')
            .appendField('Note 6');
        this.appendValueInput('PITCH7')
            .setCheck('Number')
            .appendField('Note 7');
        this.appendValueInput('PITCH8')
            .setCheck('Number')
            .appendField('Note 8');
        this.setPreviousStatement(true, null);
        this.setOutput(false);
        this.setColour(160);
    }
};

Blockly.JavaScript['mq_8step'] = function (block) {
    let note1 = Blockly.JavaScript.valueToCode(block, 'PITCH1', Blockly.JavaScript.ORDER_FUNCTION_CALL) || null;
    let note2 = Blockly.JavaScript.valueToCode(block, 'PITCH2', Blockly.JavaScript.ORDER_FUNCTION_CALL) || null;
    let note3 = Blockly.JavaScript.valueToCode(block, 'PITCH3', Blockly.JavaScript.ORDER_FUNCTION_CALL) || null;
    let note4 = Blockly.JavaScript.valueToCode(block, 'PITCH4', Blockly.JavaScript.ORDER_FUNCTION_CALL) || null;
    let note5 = Blockly.JavaScript.valueToCode(block, 'PITCH5', Blockly.JavaScript.ORDER_FUNCTION_CALL) || null;
    let note6 = Blockly.JavaScript.valueToCode(block, 'PITCH6', Blockly.JavaScript.ORDER_FUNCTION_CALL) || null;
    let note7 = Blockly.JavaScript.valueToCode(block, 'PITCH7', Blockly.JavaScript.ORDER_FUNCTION_CALL) || null;
    let note8 = Blockly.JavaScript.valueToCode(block, 'PITCH8', Blockly.JavaScript.ORDER_FUNCTION_CALL) || null;


    let code = "";
    let sampler;

    const topBlock = block.getTopStackBlock();
    if (topBlock) {
        sampler = topBlock.getFieldValue('name');
    }

    sequences[sampler] = [(note1 ? note1 : null), (note2 ? note2 : null), (note3 ? note3 : null), (note4 ? note4 : null), (note5 ? note5 : null), (note6 ? note6 : null), (note7 ? note7 : null), (note8 ? note8 : null)];

    code = `
            function ${sampler}UpdateNotes(seq) {
                seq.set({events: sequences['${sampler}'].map(note => (note ? Tone.Frequency(eval(note), "midi") : null))});
            }
            
            let ${sampler}Seq = new Tone.Sequence((time, note) => {
             
                ${sampler}.triggerAttackRelease(note, "8n", time);
                ${sampler}UpdateNotes(${sampler}Seq);
              
            }, sequences['${sampler}'].map(note => (note ? Tone.Frequency(eval(note), "midi") : null))).start(0);
        `;

    return code;
};