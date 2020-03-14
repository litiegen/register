$(function() {
	var $width = $('#width'),
	$wi = $('#wi'),
	$height = $('#height'),
	$he = $('#he'),
	$widthValidate = $('#width-validate'),
	$heightValidate = $('#height-validate'),
	$wiValidate = $('#wi-validate'),
	$heValidate = $('#he-validate'),
	isPassValidate = false;
	
	$width.focusout(function() {
		var result = validate($width.val());
		isPassValidate = result.isOK;
		if(!result.isOK) {
			$widthValidate.html('用户名' + result.reason);
			$width.select();
		}else {
			$widthValidate.html('');
		}
	});
	
	$wi.focusout(function() {
		var result = phone($wi.val());
		isPassValidate = result.isOK;
		if(!result.isOK) {
			$wiValidate.html('手机号' + result.reason);
			$wi.select();
		}else {
			$wiValidate.html('');
		}
	});
	
	$height.focusout(function() {
		var result = password($height.val());
		isPassValidate = result.isOK;
		if(!result.isOK) {
			$heightValidate.html('密码' + result.reason);
			$height.select();
		}else {
			$heightValidate.html('');
		}
	});

	$he.focusout(function() {
		var result = verification($he.val());
		isPassValidate = result.isOK;
		if(!result.isOK) {
			$heValidate.html(result.reason);
			$he.select();
		}else {
			$heValidate.html('');
		}
	});
});
/**
 * 对数据进行合法性校验
 */
function validate(data) {
	var result = {
		isOK: false,
		reason: ''
	};
	if(data === '') {
		result.reason = '不能为空！';
		return result;
	}
	
	if(/^-?(0|[1-9]\d*)(\.\d*)?([eE][+-]?\d+)?$/.test(data)) {
		result.reason = '仅支持中英文，数字和下划线且不能为纯数字';
		return result;
	}

	else if(!/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/.test(data)) {
		result.reason = '仅支持中英文，数字和下划线且不能为纯数字';
		return result;
	}
	
	
	result.isOK = true;
	return result;
}

function phone(data) {
	var result = {
		isOK: false,
		reason: ''
	};
	
	if(data === '') {
		result.reason = '不能为空！';
		return result;
	}

	if(!/^[1][3,4,5,7,8][0-9]{9}$/.test(data)) {
		result.reason = '码格式不正确';
		return result;
	}
		
	result.isOK = true;
	return result;
}

function password(data) {
	var result = {
		isOK: false,
		reason: ''
	};
	
	if(data === '') {
		result.reason = '不能为空！';
		return result;
	}

	if(!/^[\u0021-\u007E]{8,16}$/.test(data)) {
		result.reason = '格式不正确,8-16位且不能有空格汉字标点符号';
		return result;
	}
		
	result.isOK = true;
	return result;
}
function verification(data) {
	var result = {
		isOK: false,
		reason: ''
	};
	
	if(data === '') {
		result.reason = '验证码不能为空！';
		return result;
	}

	if(!/^[\u0021-\u007E]{4}$/.test(data)) {
		result.reason = '请求超时，请稍后再试';
		return result;
	}
		
	result.isOK = true;
	return result;
}

$(function() {
	var $btn = $('input[type="button"]'),
	i = 3,
	timer;
	$btn.click(function() {
		$btn.attr('disabled', 'disabled');
		timer = window.setInterval(function() {
			$btn.val('同意 (' + i-- + ' s)');
			if(i === -1) {
				window.clearInterval(timer);
				$btn.val('同意');
				$btn.removeAttr('disabled');
			}
		}, 1000);
		i = 3;
	});
});