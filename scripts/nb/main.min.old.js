var global_hooks={win:$(window),doc:$(document),body:$('body'),mobile:(/Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/i).test(navigator.userAgent.toLowerCase())&&'ontouchstart' in document.documentElement}
function clickfix(target,pane){var cfix_target=target;var cfix_pane=pane;var cfix_last=pane.find('a').last();var cfix_open=false;cfix_target.on('click',function(e){e.preventDefault();if(cfix_open===false){cfix_target.addClass('show');cfix_pane.addClass('show');cfix_open=true;}
else{cfix_target.removeClass('show');cfix_pane.removeClass('show');cfix_open=false;}})
cfix_last.on('blur',function(){cfix_target.removeClass('show');cfix_pane.removeClass('show');cfix_open=false;});}
clickfix($('#m-nav-main'),$('#header-nav-pane'));clickfix($('#m-nav-legal'),$('#m-nav-legal + ul'));function hoverfix(target,parent,pane){var hfix_target=target;var hfix_parent=parent;var hfix_pane=pane;var hfix_last=pane.find('a').last();hfix_target.on('mouseover focus',function(){hfix_parent.addClass('show');});hfix_parent.on('mouseleave',function(){hfix_parent.removeClass('show');});hfix_last.on('blur',function(){hfix_parent.removeClass('show');});}
var nav_main_hover=$('#header-nav-pane > nav > ul > li').children('a:not("#contact-link")');$.each(nav_main_hover,function(index){hoverfix(nav_main_hover.eq(index),nav_main_hover.eq(index).parent('li'),nav_main_hover.eq(index).next('ul'));});if(!global_hooks.mobile){$('a.tel').attr('href','/contact');}

/* contact handler */

var contactform_handler = {
	link: $('#contact-link'),
	form: $('#contact-form'),
	first: $('#contact-form').find('input').first(),
	required: $('#contact-form').find('input[required]'),
	close: $('#contact-close'),
	overlay: $('#contact-overlay'),
	bound: false,

	fn_show: function() {
		contactform_handler.link.addClass('show');
		contactform_handler.form.addClass('show');
		contactform_handler.first.focus();
		contactform_handler.overlay.addClass('show');
	},

	fn_hide: function() {
		contactform_handler.link.removeClass('show');
		contactform_handler.form.removeClass('show');
		contactform_handler.overlay.removeClass('show');
	},

	fn_toggle: function() {
		if (contactform_handler.form.is(':hidden')) {
			contactform_handler.fn_show();
		}
		else {
			contactform_handler.fn_hide();
		}
	},

	fn_check: function() {
		var contact_state = true;

		for (var i = 0; i < contactform_handler.required.length; i++) {

			(function(contact_temp) {

				var contact_temp_label = contactform_handler.form.find('label[for="' + contact_temp.attr('id') + '"]');

				if (contact_temp.val() == null || contact_temp.val() == "") {
					contact_state = false;
					contact_temp.addClass('invalid');
					contact_temp_label.addClass('invalid');
				}
				else {
					contact_temp.removeClass('invalid');
					contact_temp_label.removeClass('invalid');
				}

			})(contactform_handler.required.eq(i));

		}

		return contact_state;
	},

	fn_default: function() {
		contactform_handler.close.on('click', function(e) {
			e.preventDefault();
			contactform_handler.fn_hide();
		});

		contactform_handler.overlay.on('click', function(e) {
			e.preventDefault();
			contactform_handler.fn_hide();
		});

		contactform_handler.form.find('form').eq(0).on('submit', function(e) {
			if (!contactform_handler.fn_check()) {
				e.preventDefault();
				e.stopPropagation();
			}
		});

	},

	fn_bind: function() {
		if (!contactform_handler.bound) {
			contactform_handler.link.on('click', function(e) {
					e.preventDefault();
					contactform_handler.fn_toggle();
			});
			this.bound = true;
		}
	},

	fn_unbind: function() {
		if (contactform_handler.bound) {
			contactform_handler.link.off('click');
			this.bound = false;
		}
		contactform_handler.fn_hide();
	}
}

/* end contact handler */

var stickynav_handler={height:global_hooks.win.height(),position:0,headerbar:$('#header-bar'),offset:$('#header-bar').outerHeight(),active:false,fn_calc:function(sn_pos,sn_height){this.height=sn_height;this.fn_move(sn_pos);},fn_move:function(sn_pos){this.position=sn_pos;if(this.position===0){this.headerbar.css({position:'absolute',top:(this.height-this.offset)+'px'}).addClass('hb-stickynav-start').removeClass('hb-stickynav-scroll hb-stickynav-stop');}
else if(this.position>0&&this.position<(this.height-this.offset)){this.headerbar.css({position:'absolute',top:(this.height-this.offset)+'px'}).addClass('hb-stickynav-scroll').removeClass('hb-stickynav-start hb-stickynav-stop');}
else if(this.position>=(this.height-this.offset)){this.headerbar.css({position:'fixed',top:0}).addClass('hb-stickynav-stop').removeClass('hb-stickynav-start hb-stickynav-scroll');}}}
var temp_width=global_hooks.win.width();var temp_height=global_hooks.win.height();var temp_fullscreen=global_hooks.body.hasClass('fullscreen');contactform_handler.fn_default();if(temp_width>=780){if(temp_fullscreen){stickynav_handler.active=true;stickynav_handler.fn_calc(global_hooks.win.scrollTop(),global_hooks.win.height());}
if(temp_height>contactform_handler.form.outerHeight()){contactform_handler.fn_bind();}}
else{if(temp_fullscreen){global_hooks.body.removeClass('fullscreen');}}
if(temp_fullscreen){global_hooks.win.on('scroll',function(){if(stickynav_handler.active===true){stickynav_handler.fn_move(global_hooks.win.scrollTop());}});}
global_hooks.win.on('resize',function(){var temp_width=global_hooks.win.width();var temp_height=global_hooks.win.height();if(temp_width<780){if(temp_fullscreen){global_hooks.body.removeClass('fullscreen');stickynav_handler.active=false;stickynav_handler.headerbar.css({position:'',top:''}).removeClass('hb-stickynav-start hb-stickynav-stop hb-stickynav-scroll');}
contactform_handler.fn_unbind();}
else{if(temp_fullscreen){global_hooks.body.addClass('fullscreen');stickynav_handler.active=true;stickynav_handler.fn_calc(global_hooks.win.scrollTop(),global_hooks.win.height());}
if(temp_height>contactform_handler.form.outerHeight()){contactform_handler.fn_bind();}}});