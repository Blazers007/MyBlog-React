/**
 * Created by Blazers on 16/1/31.
 */
import React from 'react';
import marked from 'marked';

export default class Editor extends React.Component {



    constructor(props) {
        super(props);
        this.editor = null;
        this.state = {
            value: 'i am using __markdown__.'
        }
    }

    componentDidMount() {
        $(document).on({
            dragleave:function(e){    //拖离
                e.preventDefault();
            },
            drop:function(e){  //拖后放
                e.preventDefault();
            },
            dragenter:function(e){    //拖进
                e.preventDefault();
            },
            dragover:function(e){    //拖来拖去
                e.preventDefault();
            }
        });

        $('#dragArea').on('dragstart', event => {
            console.log('DragStart ->');
            console.log(event);
        });

        let $uploadArea = $('#uploadFileArea');
        $uploadArea.on('dragover', event => {
            $uploadArea.addClass('dragenter');
        }).on('dragleave', event => {
            $uploadArea.removeClass('dragenter');
        }).on('drop', event => {
            let e = event.originalEvent;
            $uploadArea.removeClass('dragenter');
            console.log(e.dataTransfer.files);
            let file = e.dataTransfer.files[0];
            let img = document.createElement('img');
            img.classList.add("obj");
            $uploadArea.append(img);
            var reader = new FileReader();
            reader.onload = (
                function(aImg) {
                    return function(e) {
                        aImg.src = e.target.result;
                    };
                })(img);
            reader.readAsDataURL(file);
            //
            let form = new FormData();
            form.append('uploadBy', 'blazers');
            form.append('image', file);

            let progress = $('#progress');

            let xhr = new XMLHttpRequest();
            xhr.upload.addEventListener('progress', evt => {
                if (evt.lengthComputable) {
                    let v = Math.round(evt.loaded / evt.total * 100);
                    console.log(v);
                    console.log(evt.loaded);
                    progress.attr('value', v);
                }
            });

            xhr.upload.onload = () => {console.log('上传完毕')};

            xhr.open('post', '/api/image');
            xhr.send(form);
        });

        // Test Output

        // CodeMirror
        this.editor = CodeMirror(document.getElementById('myTextArea'), {
            value: this.state.value,
            lineNumbers: true,
            mode: 'markdown'
        });

        this.editor.on('change', (ed, args)=>{
            // 上方添加快捷编辑按钮区域
            // 检查最近一次改动是否是上传图片
            this.setState({
                value: ed.getValue()
            });
            $('code').each(function(i, block) {
                $(block).wrap('<pre></pre>');
                hljs.highlightBlock(block);
            });
        });

        $('.fasts').on('click', e => {
            let cursor = this.editor.getCursor();
            console.log(cursor);
            this.editor.replaceRange('/n#### ', cursor);
            this.editor.focus();
        });

        //http://codemirror.net/doc/manual.html#api_selection  https://pandao.github.io/editor.md/
    }

    render() {
        let markdown = marked(this.state.value);
        return (
            <div className="container">
                <ul id="fast">
                    <li className="fasts">h1</li>
                    <li className="fasts">h2</li>
                    <li className="fasts">h3</li>
                    <li className="fasts">h4</li>
                    <li className="fasts">h5</li>
                    <li className="fasts">h6</li>
                    <li className="fasts">代码</li>
                    <li className="fasts">图片</li>
                    <li className="fasts">超链接</li>
                    <li className="fasts">撤销</li>
                    <li className="fasts">清空</li>
                </ul>
                <div className="row">
                    <div className="col-lg-6">
                        <div id="myTextArea"></div>
                        <div id="dragArea" className="drag-area" draggable="true">
                            <h1>Drag Me</h1>
                        </div>
                        <br/>
                        <div id="uploadFileArea" className="drag-area">
                            <h1>Drop</h1>
                        </div>
                        <progress id="progress" value="0" max="100"/>
                    </div>
                    <div className="col-lg-6">
                        <div id="output" dangerouslySetInnerHTML={{__html: markdown}}></div>
                    </div>
                </div>
            </div>
        )
    }
}