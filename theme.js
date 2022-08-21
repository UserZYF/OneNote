(function (w, und) { Refresh() }(window, undefined));

function Refresh() {
  if (isPhone()){//手机模式执行的
    setTimeout(() => {//延时执行



    }, 1000)
  } else {//pc模式执行的
    setTimeout(() => {//延时执行
      
      setTimeout(() => ClickMonitor(), 3000);//各种列表转xx
      
      rundynamicUnderline();//为文档标题创建动态下划线
      
      showDocumentCreationDate();//为打开文档标题下面显示文档创建日期
    
    }, 500);
  }
}




















/**------------------为文档标题创建动态下划线---------------------------开始 */
function rundynamicUnderline() {setInterval(dynamicUnderline, 200);}

function dynamicUnderline() {
  var AllDocumentTitleElement = getAllDocumentTitleElement();
  for (let index = 0; index < AllDocumentTitleElement.length; index++) {
    const element = AllDocumentTitleElement[index];
    var line = createLine(element);
    var txt = getTileTxt(element);
    var maxWidth = element.offsetWidth;
    var Style = getComputedStyle(element, null);
    var font = Style.font;
    var width = getTextWidth(txt, font) + 58;
    if (width < 479) { width = 479; }//动态下划线最小宽度
    if (width > maxWidth) { width = maxWidth; }//不超过一行
    line.style.width = width + "px";
  }
}

function createLine(TitleElement) {
  var item = TitleElement.parentElement.children;
  for (let index = 0; index < item.length; index++) {
    const element = item[index];
    if (element.getAttribute("Line") != null) { return element; }
  }
  var line = insertCreateAfter(TitleElement, "div");
  line.setAttribute("Line", "true");
  line.style.height = "1px";
  line.style.marginTop = "-2px";
  line.style.marginBottom = "7px";
  line.style.backgroundColor = "#D9D9D9";//动态下划线颜色
  return line;
}

function getTileTxt(TitleElement) { return TitleElement.innerText; }
/**------------------为文档标题创建动态下划线---------------------------结束 */














/**------------------为打开文档的标题下显示文档创建日期-----------------开始 */
function showDocumentCreationDate() {setInterval(DocumentCreationDate, 300);}

function DocumentCreationDate() {
  var allDocumentTitleElement = getAllDocumentTitleElement();
  for (let index = 0; index < allDocumentTitleElement.length; index++) {
    const element = allDocumentTitleElement[index];
    var documentCreatTimeElement = creatTimeSpanElement(element.parentElement);
    var spanTxt = documentCreatTimeElement.innerText;
    if (spanTxt == "" || spanTxt == "日期获取中……") {
      var documentCreatTimeTxt = getDocumentTime(element);
      documentCreatTimeElement.innerText = documentCreatTimeTxt;
    }
  }
}

/**获取所有打开文档的标题元素 */
function getAllDocumentTitleElement() {return document.querySelectorAll(".protyle-title__input");}

/**为文档标题元素下创建时间容器元素 */
function creatTimeSpanElement(tilteElement) {
  var item = tilteElement.children;
  for (let index = 0; index < item.length; index++) {
    const element = item[index];
    if (element.getAttribute("documentCreatTimeElement") != null) { return element; }
  }
  var documentCreatTimeElement = addinsertCreateElement(tilteElement, "span");
  documentCreatTimeElement.setAttribute("documentCreatTimeElement", "true");
  documentCreatTimeElement.style.display = "block";
  documentCreatTimeElement.style.marginLeft = "7px";
  documentCreatTimeElement.style.marginBottom = "0px";
  documentCreatTimeElement.style.fontSize = "61%";
  documentCreatTimeElement.style.color = "#767676";
  return documentCreatTimeElement;
}

/**获得这个文档的创建时间 */
function getDocumentTime(tilteElement) {
  var tS = tilteElement.parentElement.previousElementSibling.getAttribute("data-node-id");
  if (tS == null) {return "日期获取中……";}
  var year = tS.substring(0, 4);
  var moon = tS.substring(4, 6);
  var day = tS.substring(6, 8);
  var hour = tS.substring(8, 10);
  var minute = tS.substring(10, 12);
  var second = tS.substring(12, 14);
  return year + "-" + moon + "-" + day + "  " + hour + ":" + minute + ":" + second;
}
/**------------------为打开文档的标题下显示文档创建日期-----------------结束 */























/***js form Morgan***/


/****UI****/
function ViewSelect(selectid, selecttype) {
  let button = document.createElement("button")
  button.id = "viewselect"
  button.className = "b3-menu__item"
  button.innerHTML = '<svg class="b3-menu__icon" style="null"><use xlink:href="#iconGlobalGraph"></use></svg><span class="b3-menu__label" style="">视图选择</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="null"><use xlink:href="#iconRight"></use></svg></button>'
  button.appendChild(SubMenu(selectid, selecttype))
  return button
}

function SubMenu(selectid, selecttype, className = 'b3-menu__submenu') {
  let node = document.createElement('div');
  node.className = className;
  if (selecttype == "NodeList") {
    node.appendChild(GraphView(selectid))
    node.appendChild(TableView(selectid))
    node.appendChild(kanbanView(selectid))
    node.appendChild(DefaultView(selectid))
  }
  if (selecttype == "NodeTable") {
    node.appendChild(FixWidth(selectid))
    node.appendChild(AutoWidth(selectid))
    node.appendChild(Removeth(selectid))
    node.appendChild(Defaultth(selectid))
  }
  return node;
}

function GraphView(selectid) {
  let button = document.createElement("button")
  button.className = "b3-menu__item"
  button.setAttribute("data-node-id", selectid)
  button.setAttribute("custom-attr-name", "f")
  button.setAttribute("custom-attr-value", "dt")

  button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFiles"></use></svg><span class="b3-menu__label">转换为导图</span>`
  button.onclick = ViewMonitor
  return button
}
function TableView(selectid) {
  let button = document.createElement("button")
  button.className = "b3-menu__item"
  button.setAttribute("data-node-id", selectid)
  button.setAttribute("custom-attr-name", "f")
  button.setAttribute("custom-attr-value", "bg")

  button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTable"></use></svg><span class="b3-menu__label">转换为表格</span>`
  button.onclick = ViewMonitor
  return button
}
function kanbanView(selectid) {
  let button = document.createElement("button")
  button.className = "b3-menu__item"
  button.setAttribute("data-node-id", selectid)
  button.setAttribute("custom-attr-name", "f")
  button.setAttribute("custom-attr-value", "kb")

  button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconMenu"></use></svg><span class="b3-menu__label">转换为看板</span>`
  button.onclick = ViewMonitor
  return button
}
function DefaultView(selectid) {
  let button = document.createElement("button")
  button.className = "b3-menu__item"
  button.onclick = ViewMonitor
  button.setAttribute("data-node-id", selectid)
  button.setAttribute("custom-attr-name", "f")
  button.setAttribute("custom-attr-value", '')

  button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconList"></use></svg><span class="b3-menu__label">恢复为列表</span>`
  return button
}
function FixWidth(selectid) {
  let button = document.createElement("button")
  button.className = "b3-menu__item"
  button.onclick = ViewMonitor
  button.setAttribute("data-node-id", selectid)
  button.setAttribute("custom-attr-name", "f")
  button.setAttribute("custom-attr-value", "")

  button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTable"></use></svg><span class="b3-menu__label">页面宽度</span>`
  return button
}
function AutoWidth(selectid) {
  let button = document.createElement("button")
  button.className = "b3-menu__item"
  button.setAttribute("data-node-id", selectid)
  button.setAttribute("custom-attr-name", "f")
  button.setAttribute("custom-attr-value", "auto")
  button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTable"></use></svg><span class="b3-menu__label">自动宽度</span>`
  button.onclick = ViewMonitor
  return button
}
function Removeth(selectid) {
  let button = document.createElement("button")
  button.className = "b3-menu__item"
  button.onclick = ViewMonitor
  button.setAttribute("data-node-id", selectid)
  button.setAttribute("custom-attr-name", "t")
  button.setAttribute("custom-attr-value", "biaotou")

  button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTable"></use></svg><span class="b3-menu__label">取消表头样式</span>`
  return button
}
function Defaultth(selectid) {
  let button = document.createElement("button")
  button.className = "b3-menu__item"
  button.setAttribute("data-node-id", selectid)
  button.setAttribute("custom-attr-name", "t")
  button.setAttribute("custom-attr-value", "")
  button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTable"></use></svg><span class="b3-menu__label">默认表头样式</span>`
  button.onclick = ViewMonitor
  return button
}
function MenuSeparator(className = 'b3-menu__separator') {
  let node = document.createElement('button');
  node.className = className;
  return node;
}


function ClickMonitor() {
  window.addEventListener('mouseup', MenuShow)
}

function MenuShow() {
  setTimeout(() => {
    let selectinfo = getBlockSelected()
    if (selectinfo) {
      let selecttype = selectinfo.type
      let selectid = selectinfo.id
      if (selecttype == "NodeList" || selecttype == "NodeTable") {
        setTimeout(() => InsertMenuItem(selectid, selecttype), 0)
      }
    }
  }, 0);
}


function InsertMenuItem(selectid, selecttype) {
  let commonMenu = document.getElementById("commonMenu")
  let readonly = commonMenu.querySelector(".b3-menu__item--readonly")
  let selectview = commonMenu.querySelector('[id="viewselect"]')
  if (readonly) {
    if (!selectview) {
      commonMenu.insertBefore(ViewSelect(selectid, selecttype), readonly)
      commonMenu.insertBefore(MenuSeparator(), readonly)
    }
  }
}

function ViewMonitor(event) {
  let id = event.currentTarget.getAttribute("data-node-id")
  let attrName = 'custom-' + event.currentTarget.getAttribute("custom-attr-name")
  let attrValue = event.currentTarget.getAttribute("custom-attr-value")
  let blocks = document.querySelectorAll(`.protyle-wysiwyg [data-node-id="${id}"]`)
  if (blocks) {
    blocks.forEach(block => block.setAttribute(attrName, attrValue))
  }
  let attrs = {}
  attrs[attrName] = attrValue
  设置思源块属性(id, attrs)
}

























//++++++++++++++++++++++++++++++++++++++++api区域+++++++++++++++++++++++++++++++++++++++++++++++

/**简单判断目前思源是否是手机模式 */
function isPhone() {return document.getElementById("toolbar") == null;}

/**
 * 获得文本的占用的宽度
 * @param {*} text 字符串文班
 * @param {*} font 文本字体的样式
 * @returns 
 */
function getTextWidth(text, font) {
  var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
  var context = canvas.getContext("2d");
  context.font = font;
  var metrics = context.measureText(text);
  return metrics.width;
}

/**
 * 向指定父级创建追加一个子元素，并可选添加ID,
 * @param {Element} fatherElement 
 * @param {string} addElementTxt 要创建添加的元素标签
 * @param {string} setId 
 * @returns addElementObject
 */
function addinsertCreateElement(fatherElement, addElementTxt, setId = null) {
  var element = document.createElement(addElementTxt);
  if (setId) element.id = setId;
  fatherElement.appendChild(element);
  return element;
}


/**
 * 向指定元素后创建插入一个元素，可选添加ID
 * @param {*} targetElement 目标元素
 * @param {*} addElementTxt 要创建添加的元素标签
 * @param {*} setId 为创建元素设置ID
 */
function insertCreateAfter(targetElement, addElementTxt, setId = null) {
  var element = document.createElement(addElementTxt);
  if (setId) element.id = setId;
  var parent = targetElement.parentNode;//得到父节点
  if (parent.lastChild === targetElement) {
    parent.appendChild(element);
    return element;
  } else {
    parent.insertBefore(element, targetElement.nextSibling);//否则，当前节点的下一个节点之前添加
    return element;
  }
}

//+++++++++++++++++++++++++++++++++++++++++++++++思源API
async function 设置思源块属性(内容块id, 属性对象) {
  let url = '/api/attr/setBlockAttrs'
  return 解析响应体(向思源请求数据(url, {
    id: 内容块id,
    attrs: 属性对象,
  }))
}
async function 向思源请求数据(url, data) {
  let resData = null
  await fetch(url, {
    body: JSON.stringify(data),
    method: 'POST',
    headers: {
      Authorization: `Token ''`,
    }
  }).then(function (response) { resData = response.json() })
  return resData
}
async function 解析响应体(response) {
  let r = await response
  return r.code === 0 ? r.data : null
}

/**
 * 获得所选择的块对应的块 ID
 * @returns {string} 块 ID
 * @returns {
 *     id: string, // 块 ID
 *     type: string, // 块类型
 *     subtype: string, // 块子类型(若没有则为 null)
 * }
 * @returns {null} 没有找到块 ID */
function getBlockSelected() {
  let node_list = document.querySelectorAll('.protyle:not(.fn__none)>.protyle-content .protyle-wysiwyg--select');
  if (node_list.length === 1 && node_list[0].dataset.nodeId != null) return {
    id: node_list[0].dataset.nodeId,
    type: node_list[0].dataset.type,
    subtype: node_list[0].dataset.subtype,
  };
  return null;
}
//++++++++++++++++++++++++++++++++++++++++api区域+++++++++++++++++++++++++++++++++++++++++++++++
