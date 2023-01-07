function textareaRichTextEditorFunc() {
    var dataRichTextarea = document.querySelectorAll('[data_rich_textarea]');
    if (dataRichTextarea.length > 0) {
        dataRichTextarea.forEach(richText => {
            let richTextWrapper = document.createElement('div');
            richTextWrapper.classList.add('rich-text-data-wrapper');
            richText.style.width = "100%";
            richText.parentNode.insertBefore(richTextWrapper, richText);
            richTextWrapper.appendChild(richText);

            let createRichTextBox = document.createElement('div');
            createRichTextBox.classList.add('rich-text-data-box');
            richTextWrapper.appendChild(createRichTextBox);

            richText.nextElementSibling.innerHTML = `
        <style rel="stylesheet">
            .rich-text-data-wrapper {
                border: 1px solid rgba(0, 0, 0, 0.1);
                padding: 10px;
            }
            
            .rich-text-data-wrapper .icons-editor span {
                display: inline-block;
                width: 20px;
                height: 22px;
                line-height: 14px;
            }

            .rich-text-data-wrapper .icons-editor input,
            .rich-text-data-wrapper .icons-editor select {
                width: 40px;
                height: 22px;
                line-height: 22px;
            }
            
            .icons-editor,
            .rich-text-data-wrapper .icons-editor * {
                font-size: 9px !important;
            }
            
            .rich-text-data-wrapper .icons-editor i {
                text-align: center;
            }

            .rich-text-data-wrapper .icons-editor span,
            .rich-text-data-wrapper .icons-editor input,
            .rich-text-data-wrapper .icons-editor select {
                border: 1px solid rgba(0, 0, 0, 0.2);
                padding: 3px 0;
                margin: 2px;
                border-radius: 4px;
                text-align: center;
                cursor: pointer;
            }
            
            .rich-text-data-wrapper .icons-editor input[type*="color"] {
                width: 20px;
                height: 20px;
                padding: 0;
                margin-right: 10px;
            }

            .rich-text-data-wrapper .icons-editor select.large,
            .rich-text-data-wrapper .icons-editor span.large {
                width: 70px;
            }

            .rich-text-data-wrapper iframe {
                border: 1px solid rgba(0, 0, 0, 0.1);
                max-width: 100%;
                width: 100%;
                max-height: 250px;
                height: 250px;
                margin-top: 10px;
            }
        </style>
        <div class="icons-editor">
            <span data_editor_attribute="bold"><i class="fa fa-bold"></i></span>
            <span data_editor_attribute="italic"><i class="fa fa-italic"></i></span>
            <span data_editor_attribute="underline"><i
                    class="fa fa-underline"></i></span>
            <span data_editor_attribute="strikeThrough"><i
                    class="fa fa-strikethrough"></i></span>
            <span data_editor_attribute="justifyLeft"><i class="fa fa-align-left"></i></span>
            <span data_editor_attribute="justifyCenter"><i
                    class="fa fa-align-center"></i></span>
            <span data_editor_attribute="justifyRight"><i
                    class="fa fa-align-right"></i></span>
            <span data_editor_attribute="justifyFull"><i
                    class="fa fa-align-justify"></i></span>
            <span data_editor_attribute="cut"><i class="fa fa-cut"></i></span>
            <span data_editor_attribute="copy"><i class="fa fa-copy"></i></span>
            <span data_editor_attribute="indent"><i class="fa fa-indent"></i></span>
            <span data_editor_attribute="outdent"><i class="fa fa-dedent"></i></span>
            <span data_editor_attribute="subscript"><i
                    class="fa fa-subscript"></i></span>
            <span data_editor_attribute="superscript"><i
                    class="fa fa-superscript"></i></span>
            <span data_editor_attribute="undo"><i class="fa fa-undo"></i></span>
            <span data_editor_attribute="redo"><i class="fa fa-repeat"></i></span>
            <span data_editor_attribute="insertUnorderedList"><i
                    class="fa fa-list-ul"></i></span>
            <span data_editor_attribute="insertOrderedList"><i
                    class="fa fa-list-ol"></i></span>
            <span data_editor_attribute="insertParagraph"><i
                    class="fa fa-paragraph"></i></span>
            <select name=""
                    data_editor_attribute_argument_select="formatBlock">
                <option value="H1">H1</option>
                <option value="H2">H2</option>
                <option value="H3">H3</option>
                <option value="H4">H4</option>
                <option value="H5">H5</option>
                <option value="H6">H6</option>
            </select>
            <span data_editor_attribute="insertHorizontalRule">HR</span>
            <span data_editor_attribute_argument="createLink|prompt('Enter a URl', 'http://')"><i
                    class="fa fa-link"></i></span>
            <span data_editor_attribute="unlink"><i class="fa fa-unlink"></i></span>
            <span data_editor_attribute_toggle="sourceCode"><i class="fa fa-code"></i></span>
            <span data_editor_attribute_toggle="stopEdit" class="large">Toggle Edit</span>
            <select name="" class="large"
                    data_editor_attribute_argument_select="fontName">
                <option value="Arial">Arial</option>
                <option value="Comic Sans MS">Comic Sans MS</option>
                <option value="Courier">Courier</option>
                <option value="Georgia">Georgia</option>
                <option value="Tahoma">Tahoma</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Verdana">Verdana</option>
            </select>
            <select name="" data_editor_attribute_argument_select="fontSize">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
            </select>
            <br/>
            Font Color: <input type="color"
                               data_editor_attribute_argument_select="foreColor"/>
            Background: <input type="color"
                               data_editor_attribute_argument_select="hiliteColor"/>
            <span data_editor_attribute_argument="insertImage|prompt('Enter the imge URL', '')"><i
                    class="fa fa-file-image-o"></i></span>
            <span data_editor_attribute="selectAll" class="large">Select All</span>
        </div>
        <iframe name="richTextField"
                style="width: 1000px; height: 500px;"
                src="" frameborder="0"></iframe>
        `;

            richText.style.display = "none";
            richText.nextElementSibling.children[2].contentDocument.designMode = 'On';
        });
    }
}

textareaRichTextEditorFunc();


function toReflowTextareaRichTextEditorFunc() {
    var showingSourceCode = false;
    var isInEditMode = true;

    var dataRichTextarea = document.querySelectorAll('[data_rich_textarea]');
    if (dataRichTextarea.length > 0) {
        dataRichTextarea.forEach(richText => {
            richText.nextElementSibling.children[2].contentDocument.designMode = 'On';
        });
    }


    var dataEditorAttribute = document.querySelectorAll('[data_editor_attribute]');
    if (dataEditorAttribute.length > 0) {
        dataEditorAttribute.forEach(editorAttribute => {
            editorAttribute.addEventListener('click', function (e) {
                var dataAttributeValue = editorAttribute.getAttribute('data_editor_attribute');
                editorAttribute.parentElement.nextElementSibling.contentDocument.execCommand(dataAttributeValue, false, null);
            });
        });
    }

    var dataEditorAttributeArgumentSelect = document.querySelectorAll('[data_editor_attribute_argument_select]');
    if (dataEditorAttributeArgumentSelect.length > 0) {
        dataEditorAttributeArgumentSelect.forEach(editorAttributeArgumentSelect => {
            editorAttributeArgumentSelect.addEventListener('change', function (e) {
                var dataAttributeArgumentSelect = this;
                var dataAttributeArgumentSelectValue = this.getAttribute('data_editor_attribute_argument_select');
                this.parentElement.nextElementSibling.contentDocument.execCommand(dataAttributeArgumentSelectValue, false, editorAttributeArgumentSelect.value)
            });
        });
    }


    var dataEditorAttributeArgument = document.querySelectorAll('[data_editor_attribute_argument]');
    if (dataEditorAttributeArgument.length > 0) {
        dataEditorAttributeArgument.forEach(editorAttributeArgument => {
            editorAttributeArgument.addEventListener('click', function (e) {
                var dataAttributeArgumentValue = this.getAttribute('data_editor_attribute_argument');
                this.parentElement.nextElementSibling.contentDocument.execCommand(dataAttributeArgumentValue.split('|')[0], false, eval(dataAttributeArgumentValue.split('|')[1]))
            });
        });
    }

    var dataEditorAttributeToggle = document.querySelectorAll('[data_editor_attribute_toggle]');
    if (dataEditorAttributeToggle.length > 0) {
        dataEditorAttributeToggle.forEach(editorAttributeToggle => {
            editorAttributeToggle.addEventListener('click', function (e) {
                var dataEditorAttributeToggleValue = this.getAttribute('data_editor_attribute_toggle');
                console.log(dataEditorAttributeToggleValue)
                if (dataEditorAttributeToggleValue == "sourceCode") {
                    if (showingSourceCode) {
                        this.parentElement.nextElementSibling.contentDocument.getElementsByTagName('body')[0].innerHTML = this.parentElement.nextElementSibling.contentDocument.getElementsByTagName('body')[0].textContent;
                        showingSourceCode = false;
                    } else {
                        this.parentElement.nextElementSibling.contentDocument.getElementsByTagName('body')[0].textContent = this.parentElement.nextElementSibling.contentDocument.getElementsByTagName('body')[0].innerHTML;
                        showingSourceCode = true;
                    }
                }

                if (dataEditorAttributeToggleValue == "stopEdit") {
                    if (isInEditMode) {
                        this.parentElement.nextElementSibling.contentDocument.designMode = 'Off';
                        isInEditMode = false;
                    } else {
                        this.parentElement.nextElementSibling.contentDocument.designMode = 'On';
                        isInEditMode = true;
                    }
                }
            });
        });
    }


    /* iFrame and Textarea sync code */
    var iFrameEditor = document.querySelectorAll('[name="richTextField"]');
    if (iFrameEditor.length > 0) {
        iFrameEditor.forEach(editor => {
            var e = editor.contentWindow;
            var editorIn = editor;

            console.log(editor.contentWindow)
            //<![CDATA[
            var editor = function () {
                e.document.designMode = "on";
                e.document.open();
                e.document.write("<head><style>body{font-family:arial,helvetica,sans-serif;}</style></head>");
                e.document.close();
                var a, b;

                var dataRichTextarea = editor.parentElement.previousElementSibling;
                console.log(dataRichTextarea)

                return {
                    run: function (c, s) {
                        e.document.execCommand(c, false, s);
                    },
                    source: function () {
                        clearInterval(b);
                        a = setInterval(function () {
                            dataRichTextarea.value = e.document.body.innerHTML;

                            dataRichTextarea.innerHTML = dataRichTextarea.value;
                        }, 200);
                    },
                    rte: function () {
                        clearInterval(a);
                        b = setInterval(function () {
                            e.document.body.innerHTML = dataRichTextarea.value;
                        }, 200);
                    }
                };
            }();
            editor.source();
            //]]>

        });
    }
}

toReflowTextareaRichTextEditorFunc();