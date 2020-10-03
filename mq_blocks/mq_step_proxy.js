

Blockly.Blocks['mq_step_proxy'] = {
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
        this.setPreviousStatement(true, null);
        this.setOutput(false);
        this.setColour(160);
    }
};

Blockly.JavaScript['mq_step_proxy'] = function (block) {
    let note1 = Blockly.JavaScript.valueToCode(block, 'PITCH1', Blockly.JavaScript.ORDER_FUNCTION_CALL) || null;
    let note2 = Blockly.JavaScript.valueToCode(block, 'PITCH2', Blockly.JavaScript.ORDER_FUNCTION_CALL) || null;
    let note3 = Blockly.JavaScript.valueToCode(block, 'PITCH3', Blockly.JavaScript.ORDER_FUNCTION_CALL) || null;
    let note4 = Blockly.JavaScript.valueToCode(block, 'PITCH4', Blockly.JavaScript.ORDER_FUNCTION_CALL) || null;
    let code = "";
    let sampler;

    const topBlock = block.getTopStackBlock();
    if (topBlock) {
        sampler = topBlock.getFieldValue('name');
    }

    sequencesProxy[sampler] = [(note1 ? Tone.Frequency(note1, "midi") : null), (note2 ? Tone.Frequency(note2, "midi") : null), (note3 ? Tone.Frequency(note3, "midi") : null), (note4 ? Tone.Frequency(note4, "midi") : null)];

    // function updateNotes() {
    //     notes = [Tone.Frequency(note1, "midi"), Tone.Frequency(note2, "midi"), Tone.Frequency(note3, "midi"), Tone.Frequency(note4, "midi")];
    //     console.log("ran updateNotes");
    // }



    code = `
            //sequencesProxy['${sampler}'] = [(sequencesProxy['note1'] ? Tone.Frequency(${note1}, "midi") : null), (${note2}? Tone.Frequency(${note2}, "midi") : null), (${note3} ? Tone.Frequency(${note3}, "midi") : null), (${note4} ? Tone.Frequency(${note4}, "midi") : null)];
            
            //console.log("sequences['${sampler}']: " + sequences['${sampler}']);
            
            //function ${sampler}UpdateNotes(seq, note1, note2, note3, note4) {
                
               // sequencesProxy['${sampler}'] = [(note1 ? Tone.Frequency(note1, "midi") : null), (note2 ? Tone.Frequency(note2, "midi") : null), (note3 ? Tone.Frequency(note3, "midi") : null), (note4 ? Tone.Frequency(note4, "midi") : null)];
                
                //seq.set({events: sequencesProxy['${sampler}']});
            //}
            
            let ${sampler}Seq = new Tone.Sequence((time, note) => {
                ${sampler}.triggerAttackRelease(note, "8n", time);
            }, [(note1 ? Tone.Frequency(note1, "midi") : null), (note2 ? Tone.Frequency(note2, "midi") : null), (note3 ? Tone.Frequency(note3, "midi") : null), (note4 ? Tone.Frequency(note4, "midi") : null)]).start(0);
        `;

    // let ${sampler}Update = new Tone.Loop((time, note) => {
    //     updateNotes();
    //     ${sampler}Seq.set({events: notes});
    // })
    // code = `let notes = [Tone.Frequency(${note1}, "midi"), Tone.Frequency(${note2}, "midi"), Tone.Frequency(${note3}, "midi"), Tone.Frequency(${note4}, "midi")];
    // const loop = new Tone.Loop((time) => {
    //         let ${sampler}Seq = new Tone.Pattern((time, note) => {
    //         }, notes, "up");
    //         ${sampler}Seq.set({events: notes});
    //     }, "4n").start(0);
    //     `;


    return code;
};