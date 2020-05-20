$.fn.numberKeyboard = function(settings) {
	var defaultSettings = {
		keyFn: null,
		backFn: null
	};

	$.extend(defaultSettings, settings);

	this.on("click focus", function(e) {
		if($(document).find(".ydwy-keyboard").length !== 0) {
			return;
		}

		// 获取输入框的宽度，高度
		var inputWidth = $(this).outerWidth(true);
		var inputHeight = $(this).outerHeight(true);
		// 获取输入框的偏移位置
		var inputOffset = $(this).offset();

		var keyboardHtml = [];
		keyboardHtml.push('<div class="ydwy-keyboard" onselectstart="return false;">');
		keyboardHtml.push('    <div class="ydwy-keyboard-button">');
		keyboardHtml.push('        <button type="button" data-value="1"><span>1</span></button>');
		keyboardHtml.push('        <button type="button" data-value="2"><span>2</span></button>');
		keyboardHtml.push('        <button type="button" data-value="3"><span>3</span></button>');
		keyboardHtml.push('        <button type="button" data-value="4"><span>4</span></button>');
		keyboardHtml.push('        <button type="button" data-value="5"><span>5</span></button>');
		keyboardHtml.push('        <button type="button" data-value="6"><span>6</span></button>');
		keyboardHtml.push('        <button type="button" data-value="7"><span>7</span></button>');
		keyboardHtml.push('        <button type="button" data-value="8"><span>8</span></button>');
		keyboardHtml.push('        <button type="button" data-value="9"><span>9</span></button>');
		keyboardHtml.push('        <button type="button" data-value="0"><span>0</span></button>');
		keyboardHtml.push('        <button type="button" data-value="back" class="back"><span>删除</span></button>');
		keyboardHtml.push('    </div>');
		keyboardHtml.push('    <div class="keyboard-mask"></div>');
		keyboardHtml.push('</div>');
		var $keybaord = $(keyboardHtml.join(""));
		// 要先渲染完成后才能获取到宽度
		$(document.body).append($keybaord);
		$keybaord.show();

		// 获取键盘宽度，高度
		var keyboardWidth = $keybaord.outerWidth(true);
		var keyboardHeight = $keybaord.outerHeight(true);

		// 获取键盘的左偏移值
		var keyboardLeft = 0;
		// 如果输入框的宽度的一半加上offset.left的值小于键盘宽度的一半，则键盘与输入框左对齐
		if((inputWidth / 2 + inputOffset.left) < keyboardWidth / 2) {
			keyboardLeft = inputOffset.left;
		}
		// 如果输入框的宽度的一半加上offset.right的值小于键盘宽度的一半，则键盘与输入框右对齐
		else if((inputWidth / 2 + inputOffset.right) < keyboardWidth / 2) {
			keyboardLeft = inputWidth + inputOffset.left - keyboardWidth;
		} else {
			keyboardLeft = (inputWidth / 2 + inputOffset.left) - keyboardWidth / 2;
		}

		var windowHeight = $(window).height();

		var keyboardTop = 0;
		// 获取键盘的顶部偏移值
		if((windowHeight - inputHeight - inputOffset.top) < (keyboardHeight + 10)) {
			keyboardTop = inputOffset.top - keyboardHeight - 10;
		} else {
			keyboardTop = inputHeight + inputOffset.top + 10;
		}

		// 设置键盘相对input的位置
		$keybaord.css({
			left: keyboardLeft,
			top: keyboardTop
		});

		// 关闭键盘
		$keybaord.close = function() {
			$keybaord.remove();
		}

		var $that = $(this);
		// 给按钮绑定事件
		$keybaord.find("button").click(function() {
			var buttonValue = $(this).data("value");
			switch(buttonValue) {
				case "back":
					if(defaultSettings.backFn) {
						defaultSettings.backFn($keybaord, buttonValue);
					} else {
						var inputValue = $that.val();
						if(inputValue && inputValue.length > 0) {
							inputValue = inputValue.substr(0, inputValue.length - 1);
							$that.val(inputValue);
						}
					}
					break;
				default:
					if(defaultSettings.keyFn) {
						defaultSettings.keyFn($keybaord, buttonValue);
					} else {
						$that.val($that.val() + buttonValue);
					}
					break;
			}
		}).mousedown(function(e) {
			e.preventDefault();
		});

		// 点击键盘区域和输入框以外的地方关闭键盘
		$(document).off("click.destroyKeyboard").on("click.destroyKeyboard", function(e) {
			if($(e.target).find(".ydwy-keyboard").length !== 0) {
				$keybaord.close();
			}
		});

		e.stopPropagation();

	});

	return this;
};

$.fn.keyboard = function(settings) {
	var defaultSettings = {
		keyFn: null,
		backFn: null,
		enterFn: null,
		closeFn: null
	};

	$.extend(defaultSettings, settings);

	this.on("click focus", function(e) {
		if($(document).find(".ydwy-keyboard").length !== 0) {
			return;
		}

		// 获取输入框的宽度，高度
		var inputWidth = $(this).outerWidth(true);
		var inputHeight = $(this).outerHeight(true);
		// 获取输入框的偏移位置
		var inputOffset = $(this).offset();

		var keyboardHtml = [];
		keyboardHtml.push('<div class="ydwy-keyboard" onselectstart="return false;">');
		keyboardHtml.push('    <div class="ydwy-keyboard-button">');
		keyboardHtml.push('        <button type="button" data-value="`"><span>`</span></button>');
		keyboardHtml.push('        <button type="button" data-value="1"><span>1</span></button>');
		keyboardHtml.push('        <button type="button" data-value="2"><span>2</span></button>');
		keyboardHtml.push('        <button type="button" data-value="3"><span>3</span></button>');
		keyboardHtml.push('        <button type="button" data-value="4"><span>4</span></button>');
		keyboardHtml.push('        <button type="button" data-value="5"><span>5</span></button>');
		keyboardHtml.push('        <button type="button" data-value="6"><span>6</span></button>');
		keyboardHtml.push('        <button type="button" data-value="7"><span>7</span></button>');
		keyboardHtml.push('        <button type="button" data-value="8"><span>8</span></button>');
		keyboardHtml.push('        <button type="button" data-value="9"><span>9</span></button>');
		keyboardHtml.push('        <button type="button" data-value="0"><span>0</span></button>');
		keyboardHtml.push('        <button type="button" data-value="-"><span>-</span></button>');
		keyboardHtml.push('        <button type="button" data-value="="><span>=</span></button>');
		keyboardHtml.push('        <button type="button" data-value="back" class="back"><span>删除</span></button>');
		keyboardHtml.push('        <br/>');
		keyboardHtml.push('        <button type="button" data-value="Q"><span>Q</span></button>');
		keyboardHtml.push('        <button type="button" data-value="W"><span>W</span></button>');
		keyboardHtml.push('        <button type="button" data-value="E"><span>E</span></button>');
		keyboardHtml.push('        <button type="button" data-value="R"><span>R</span></button>');
		keyboardHtml.push('        <button type="button" data-value="T"><span>T</span></button>');
		keyboardHtml.push('        <button type="button" data-value="Y"><span>Y</span></button>');
		keyboardHtml.push('        <button type="button" data-value="U"><span>U</span></button>');
		keyboardHtml.push('        <button type="button" data-value="I"><span>I</span></button>');
		keyboardHtml.push('        <button type="button" data-value="O"><span>O</span></button>');
		keyboardHtml.push('        <button type="button" data-value="P"><span>P</span></button>');
		keyboardHtml.push('        <button type="button" data-value="["><span>[</span></button>');
		keyboardHtml.push('        <button type="button" data-value="]"><span>]</span></button>');
		keyboardHtml.push('        <button type="button" data-value="\\"><span>\\</span></button>');
		keyboardHtml.push('        <br/>');
		keyboardHtml.push('        <button type="button" data-value="A"><span>A</span></button>');
		keyboardHtml.push('        <button type="button" data-value="S"><span>S</span></button>');
		keyboardHtml.push('        <button type="button" data-value="D"><span>D</span></button>');
		keyboardHtml.push('        <button type="button" data-value="F"><span>F</span></button>');
		keyboardHtml.push('        <button type="button" data-value="G"><span>G</span></button>');
		keyboardHtml.push('        <button type="button" data-value="H"><span>H</span></button>');
		keyboardHtml.push('        <button type="button" data-value="J"><span>J</span></button>');
		keyboardHtml.push('        <button type="button" data-value="K"><span>K</span></button>');
		keyboardHtml.push('        <button type="button" data-value="L"><span>L</span></button>');
		keyboardHtml.push('        <button type="button" data-value=";"><span>;</span></button>');
		keyboardHtml.push('        <button type="button" data-value="\'"><span>\'</span></button>');
		keyboardHtml.push('        <button type="button" data-value="enter" class="enter"><span>回车</span></button>');
		keyboardHtml.push('        <br/>');
		keyboardHtml.push('        <button type="button" data-value="Z"><span>Z</span></button>');
		keyboardHtml.push('        <button type="button" data-value="X"><span>X</span></button>');
		keyboardHtml.push('        <button type="button" data-value="C"><span>C</span></button>');
		keyboardHtml.push('        <button type="button" data-value="V"><span>V</span></button>');
		keyboardHtml.push('        <button type="button" data-value="B"><span>B</span></button>');
		keyboardHtml.push('        <button type="button" data-value="N"><span>N</span></button>');
		keyboardHtml.push('        <button type="button" data-value="M"><span>M</span></button>');
		keyboardHtml.push('        <button type="button" data-value=","><span>,</span></button>');
		keyboardHtml.push('        <button type="button" data-value="."><span>.</span></button>');
		keyboardHtml.push('        <button type="button" data-value="/"><span>/</span></button>');
		keyboardHtml.push('        <br/>');
		keyboardHtml.push('        <button type="button" data-value=" " class="space"><span>空格</span></button>');
		keyboardHtml.push('        <button type="button" data-value="close" class="close"><span>关闭</span></button>');
		keyboardHtml.push('    </div>');
		keyboardHtml.push('    <div class="keyboard-mask"></div>');
		keyboardHtml.push('</div>');
		var $keybaord = $(keyboardHtml.join(""));
		// 要先渲染完成后才能获取到宽度
		$(document.body).append($keybaord);
		$keybaord.slideDown();

		// 获取键盘宽度，高度
		var keyboardWidth = $keybaord.outerWidth(true);
		var keyboardHeight = $keybaord.outerHeight(true);

		// 获取键盘的左偏移值
		var keyboardLeft = 0;
		// 如果输入框的宽度的一半加上offset.left的值小于键盘宽度的一半，则键盘与输入框左对齐
		if((inputWidth / 2 + inputOffset.left) < keyboardWidth / 2) {
			keyboardLeft = inputOffset.left;
		}
		// 如果输入框的宽度的一半加上offset.right的值小于键盘宽度的一半，则键盘与输入框右对齐
		else if((inputWidth / 2 + inputOffset.right) < keyboardWidth / 2) {
			keyboardLeft = inputWidth + inputOffset.left - keyboardWidth;
		} else {
			keyboardLeft = (inputWidth / 2 + inputOffset.left) - keyboardWidth / 2;
		}

		var windowHeight = $(window).height();

		var keyboardTop = 0;
		// 获取键盘的顶部偏移值
		if((windowHeight - inputHeight - inputOffset.top) < (keyboardHeight + 10)) {
			keyboardTop = inputOffset.top - keyboardHeight - 10;
		} else {
			keyboardTop = inputHeight + inputOffset.top + 10;
		}

		// 设置键盘相对input的位置
		$keybaord.css({
			left: keyboardLeft,
			top: keyboardTop
		});

		// 关闭键盘
		$keybaord.close = function() {
			$keybaord.slideUp(function() {
				$(this).remove();
			});
		}

		var $that = $(this);
		// 给按钮绑定事件
		$keybaord.find("button").click(function() {
			var buttonValue = $(this).data("value");
			switch(buttonValue) {
				case "back":
					if(defaultSettings.backFn) {
						defaultSettings.backFn($keybaord, buttonValue);
					} else {
						var inputValue = $that.val();
						if(inputValue && inputValue.length > 0) {
							inputValue = inputValue.substr(0, inputValue.length - 1);
							$that.val(inputValue);
						}
					}
					break;
				case "enter":
					if(defaultSettings.enterFn) {
						defaultSettings.enterFn($keybaord, buttonValue);
					} else {
						$keybaord.close();
					}
					break;
				case "close":
					if(defaultSettings.closeFn) {
						defaultSettings.closeFn($keybaord, buttonValue);
					} else {
						$keybaord.close();
					}
					break;
				default:
					if(defaultSettings.keyFn) {
						defaultSettings.keyFn($keybaord, buttonValue);
					} else {
						$that.val($that.val() + buttonValue);
					}
					break;
			}
		}).mousedown(function(e) {
			e.preventDefault();
		});

		// 点击键盘区域和输入框以外的地方关闭键盘
		$(document).off("click.destroyKeyboard").on("click.destroyKeyboard", function(e) {
			if($(e.target).find(".ydwy-keyboard").length !== 0) {
				$keybaord.close();
			}
		});

		e.stopPropagation();

	});

	return this;
};