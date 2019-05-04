export = index;
declare function index(): any;
declare namespace index {
    class Compiler {
        constructor(...args: any[]);
        all(parent: any): any;
        block(node: any): any;
        compile(): any;
        enterLink(): any;
        enterLinkReference(compiler: any, node: any): any;
        enterTable(): any;
        setOptions(options: any): any;
        visit(node: any, parent: any): any;
        visitOrderedItems(node: any): any;
        visitUnorderedItems(node: any): any;
    }
    class Parser {
        constructor(...args: any[]);
        enterBlock(): any;
        enterLink(): any;
        enterList(): any;
        exitStart(): any;
        parse(): any;
        setOptions(options: any): any;
        tokenizeBlock(value: any, location: any): any;
        tokenizeFactory(type: any): any;
        tokenizeInline(value: any, location: any): any;
    }
    const attachers: Function[][];
    function data(key: any, value: any, ...args: any[]): any;
    function freeze(): any;
    function parse(doc: any): any;
    function process(doc: any, cb: any): any;
    function processSync(doc: any): any;
    function run(node: any, file: any, cb: any): any;
    function runSync(node: any, file: any): any;
    function stringify(node: any, doc: any): any;
    function use(value: any, ...args: any[]): any;
}
