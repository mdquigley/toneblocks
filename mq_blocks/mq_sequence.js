Blockly.Blocks['mq_sequence'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("play")
            .appendField(new Blockly.FieldDropdown([["major", "major"], ["minor", "minor"]]), "quality")
            .appendField("seq")
            .appendField(new Blockly.FieldTextInput("12345678"), "sequence")
            .appendField("root")
            .appendField(new Blockly.FieldNumber(60, 21, 127), "root")
            .appendField("/")
            .appendField(new Blockly.FieldNumber(8), "NAME")
            .appendField("note duration");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
    }
};

Blockly.JavaScript['mq_sequence'] = function (block) {
    const quality = block.getFieldValue('quality');
    let sequence = block.getFieldValue('sequence');
    const root = block.getFieldValue('root');
    const duration = block.getFieldValue('duration');

    const maj = [0, 2, 4, 5, 7, 9, 11, 12];
    const min = [0, 2, 3, 5, 7, 8, 10, 12];

    sequence = sequence.split("");
    let mapSeq = sequence.map(x => {
        // map the user input "sequence" to the note modifiers
        // based on "quality"

        if (quality == 'major') {
            return (maj[parseInt(x) - 1] + parseInt(root));
        }
        if (quality == 'minor') {
            return (min[parseInt(x) - 1] + parseInt(root));
        }

    });


    console.log(sequence);
    console.log(mapSeq);




    // const testSynth = new Tone.Synth().toDestination();
    // // use an array of objects as long as the object has a "time" attribute
    // const part = new Tone.Part(((time, note) => {
    //     // the value is an object which contains both the note and the velocity
    //     testSynth.triggerAttackRelease(note, "8n", time);
    // }), [[0, "C2"], ["0:2", "C3"], ["0:3:2", "G2"]]).start(0);


    const code = '0;\n';
    return code;
};