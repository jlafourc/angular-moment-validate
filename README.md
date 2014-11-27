angular-moment-validate
=======================

A directive useful to validate an text in an input against date formats of moment.js.
The directive parses the input and if valid, a moment object will be created and put into the model.

Basic example
=============

    <input type="text" 
           moment-validate 
           ng-model-options="{ updateOn: 'blur' }" 
           name="emma" 
           placeholder="DD/MM/AAAA" 
           ng-model="ctrl.date">

Options
=======

Model type
----------

Type of the value placed into the model

    <input type="text" moment-validate="moment|string">

View format
-----------

A "moment valid" format

     <input type="text" moment-validate="moment" moment-validate-view-format="L">

Model format
-----------

A "moment valid" format. Relevant only for : moment-validate="string"

    <input type="text" moment-validate="moment" moment-validate-model-format="YYYY-MM-DD">
    
TODO
====

 * UNIT TESTING
 