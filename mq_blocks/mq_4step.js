Blockly.Blocks['mq_4step'] = {
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
        this.setColour(210);
    }
};

Blockly.JavaScript['mq_4step'] = function (block) {
    let note1 = Blockly.JavaScript.valueToCode(block, 'PITCH1', Blockly.JavaScript.ORDER_FUNCTION_CALL) || null;
    let note2 = Blockly.JavaScript.valueToCode(block, 'PITCH2', Blockly.JavaScript.ORDER_FUNCTION_CALL) || null;
    let note3 = Blockly.JavaScript.valueToCode(block, 'PITCH3', Blockly.JavaScript.ORDER_FUNCTION_CALL) || null;
    let note4 = Blockly.JavaScript.valueToCode(block, 'PITCH4', Blockly.JavaScript.ORDER_FUNCTION_CALL) || null;
    let code = "";
    let synth;

    const topBlock = block.getTopStackBlock();
    if (topBlock) {
        synth = topBlock.getFieldValue('name');
    }

    sequences[synth] = [(note1 ? note1 : null), (note2 ? note2 : null), (note3 ? note3 : null), (note4 ? note4 : null)];

    // sequences[synth] = [(note1 ? Tone.Frequency(note1, "midi") : null), (note2 ? Tone.Frequency(note2, "midi") : null), (note3 ? Tone.Frequency(note3, "midi") : null), (note4 ? Tone.Frequency(note4, "midi") : null)];

    // function updateNotes() {
    //     notes = [Tone.Frequency(note1, "midi"), Tone.Frequency(note2, "midi"), Tone.Frequency(note3, "midi"), Tone.Frequency(note4, "midi")];
    //     console.log("ran updateNotes");
    // }



    code = `
            function ${synth}UpdateNotes(seq) {
                seq.set({events: sequences['${synth}'].map(note => (note ? Tone.Frequency(eval(note), "midi") : null))});
            }
            
            let ${synth}Seq = new Tone.Sequence((time, note) => {
             
                ${synth}.triggerAttackRelease(note, "8n", time);
                ${synth}UpdateNotes(${synth}Seq);
              
            }, sequences['${synth}'].map(note => (note ? Tone.Frequency(eval(note), "midi") : null))).start(0);
        `;

    // function ${synth}UpdateNotes(seq) {

    //     sequences['${synth}'] = [(${Blockly.JavaScript.valueToCode(block, 'PITCH1', Blockly.JavaScript.ORDER_FUNCTION_CALL) || null} ? Tone.Frequency(${Blockly.JavaScript.valueToCode(block, 'PITCH1', Blockly.JavaScript.ORDER_FUNCTION_CALL) || null}, "midi") : null), (${note2}? Tone.Frequency(${note2}, "midi") : null), (${note3} ? Tone.Frequency(${note3}, "midi") : null), (${note4} ? Tone.Frequency(${note4}, "midi") : null)];

    //      seq.set({events: sequences['${synth}']});
    //  }

    // let ${synth}Update = new Tone.Loop((time, note) => {
    //     updateNotes();
    //     ${synth}Seq.set({events: notes});
    // })
    // code = `let notes = [Tone.Frequency(${note1}, "midi"), Tone.Frequency(${note2}, "midi"), Tone.Frequency(${note3}, "midi"), Tone.Frequency(${note4}, "midi")];
    // const loop = new Tone.Loop((time) => {
    //         let ${synth}Seq = new Tone.Pattern((time, note) => {
    //         }, notes, "up");
    //         ${synth}Seq.set({events: notes});
    //     }, "4n").start(0);
    //     `;


    return code;
};