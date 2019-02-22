## Members

<dl>
<dt><a href="#fs">fs</a></dt>
<dd><p>Quizam. A no-fuss yaml CLI quiz runner.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#init">init()</a></dt>
<dd><p>Initialise a quiz. Asks for name and author then writes ./quizam.yaml.</p>
</dd>
<dt><a href="#cleanse">cleanse(str)</a></dt>
<dd><p>Helper function to clean strings for comparisons.</p>
</dd>
<dt><a href="#select">select(quiz)</a> ⇒ <code>Object</code></dt>
<dd><p>Select handles a question with option set and one answer.</p>
</dd>
<dt><a href="#multi">multi(quiz)</a> ⇒ <code>Object</code></dt>
<dd><p>Handles a multiselect question.</p>
</dd>
<dt><a href="#input">input(quiz)</a> ⇒ <code>Object</code></dt>
<dd><p>Handle question requiring input.</p>
</dd>
<dt><a href="#run">run()</a></dt>
<dd><p>The main run function. It will pass for all .js files
in the recursive function and not in the folders specified
and generate documentation if it can.</p>
</dd>
</dl>

<a name="fs"></a>

## fs
Quizam. A no-fuss yaml CLI quiz runner.

**Kind**: global variable  
**Author**: Dennis O'Keeffe  
<a name="init"></a>

## init()
Initialise a quiz. Asks for name and author then writes ./quizam.yaml.

**Kind**: global function  
<a name="cleanse"></a>

## cleanse(str)
Helper function to clean strings for comparisons.

**Kind**: global function  

| Param | Type            |
| ----- | --------------- |
| str   | <code>\*</code> |

<a name="select"></a>

## select(quiz) ⇒ <code>Object</code>
Select handles a question with option set and one answer.

**Kind**: global function  
**Returns**: <code>Object</code> - Prompts function  

| Param | Type            | Description            |
| ----- | --------------- | ---------------------- |
| quiz  | <code>\*</code> | Select question object |

<a name="multi"></a>

## multi(quiz) ⇒ <code>Object</code>
Handles a multiselect question.

**Kind**: global function  
**Returns**: <code>Object</code> - Prompts function  

| Param | Type            | Description                 |
| ----- | --------------- | --------------------------- |
| quiz  | <code>\*</code> | Multiselect question object |

<a name="input"></a>

## input(quiz) ⇒ <code>Object</code>
Handle question requiring input.

**Kind**: global function  
**Returns**: <code>Object</code> - Prompts object  

| Param | Type            | Description           |
| ----- | --------------- | --------------------- |
| quiz  | <code>\*</code> | Input question object |

<a name="run"></a>

## run()
The main run function. It will pass for all .js files
in the recursive function and not in the folders specified
and generate documentation if it can.

**Kind**: global function  
