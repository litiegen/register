$(function() {
	var $user = $('#user'),
	$phonenum = $('#phonenum'),
	$password = $('#password'),
	$code = $('#code'),
	$userBox = $('#user-box'),
	$passwordBox = $('#password-box'),
	$phonenumBox = $('#phonenum-box'),
	$codeBox = $('#code-box'),
	isPassBox = false;
	
	$user.focusout(function() {
		var result = validate($user.val());
		isPassBox = result.isOK;
		if(!result.isOK) {
			$userBox.html('用户名' + result.reason);
			$user.select();
		}else {
			$userBox.html('');
		}
	});
	$phonenum.focusout(function() {
		var result = phone($phonenum.val());
		isPassBox = result.isOK;
		if(!result.isOK) {
			$phonenumBox.html('手机号' + result.reason);
			$phonenum.select();
		}else {
			$phonenumBox.html('');
		}
	});
	$password.focusout(function() {
		var result = password($password.val());
		isPassBox = result.isOK;
		if(!result.isOK) {
			$passwordBox.html('密码' + result.reason);
			$password.select();
		}else {
			$passwordBox.html('');
		}
	})
	$code.focusout(function() {
		var result = verification($code.val());
		isPassBox = result.isOK;
		if(!result.isOK) {
			$codeBox.html(result.reason);
			$code.select();
		}else {
			$codeBox.html('');
		}
	});
});
/*** 对数据进行合法性校验 ***/
function validate(data) {
	var result = {
		isOK: false,
		reason: ''
	};
	if(data === '') {
		result.reason = '不能为空！';
		return result;
	}
	if(/^-?([0-9]\d*)(\.\d*)?([eE][+-]?\d+)?$/.test(data)) {
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
	if(!/(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^[^\s\u4e00-\u9fa5]{8,14}$/.test(data)) {
		result.reason = '格式不正确,8-14位,字母/数字以及标点至少两种且不能有空格中文';
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
/*** 发送验证码 ***/
$(function() {
	var $btn = $('#btn'),
	i = 3,
	timer;
	$btn.click(function() {
		$btn.attr('disabled', 'disabled');
		timer = window.setInterval(function() {
			$btn.val('已发送 (' + i-- + ' s)');
			if(i === -1) {
				window.clearInterval(timer);
				$btn.val('获取验证码');
				$btn.removeAttr('disabled');
			}
		}, 1000);
		i = 3;
	});
});