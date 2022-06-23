var that = this;

var Module = {
    'print': function report(str) {
        that.postMessage(["output", str]);
    },
    'printErr': function report(str) {
        that.postMessage(["output", str]);
    }
};

importScripts('ksolve++.js');

var ready = false;

Module['onRuntimeInitialized'] = function(){
    console.log("ready");
    ready = true;
}

this.addEventListener('message',
    function(d){
        if(!ready){
            return;
        }
        
        if(d.data[0] == "run"){
            var prepare = Module.cwrap('prepare', 'void');
            var readDef = Module.cwrap('readDef', 'void', ['string']);
            var getName = Module.cwrap('getName', 'string');
            var buildMain = Module.cwrap('buildMain', 'string');
            var buildPruning = Module.cwrap('buildPruning', 'string');
            var buildPuzzle = Module.cwrap('buildPuzzle', 'string');
            var buildScramble = Module.cwrap('buildScramble', 'string');
            var buildScrambleReader = Module.cwrap('buildScrambleReader', 'string');
            var buildSolver = Module.cwrap('buildSolver', 'string');
            
            prepare();
            readDef(d.data[1]);
            postMessage(["name", getName()]);
            postMessage(["main", buildMain()]);
            postMessage(["pruning", buildPruning()]);
            postMessage(["puzzle", buildPuzzle()]);
            postMessage(["scramble", buildScramble()]);
            postMessage(["scramblereader", buildScrambleReader()]);
            postMessage(["solver", buildSolver()]);
            
            postMessage(["finished"]);
        }
        else{
            Module.print("Bad message.");
        }
    },
false);
