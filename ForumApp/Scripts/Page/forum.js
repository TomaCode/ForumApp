﻿$('#btnAddTopic').on('click', function (e) {
	var modalTemplate =
		$('<div class="modal" id="modal_win" role = "dialog" >\
			<div class="modal-dialog">\
				<div class="modal-content">\
					<div class="modal-header">\
						<button type="button" class="close btnClose" data-dismiss="modal">&times;</button>\
						<h4 class="modal-title">Topic Details</h4>\
					</div>\
					<div class="modal-body">\
						<p>Name: </p><input id="name" type="text">\
					</div>\
					<div class="modal-footer">\
						<button type="button" class="btn btn-default ok" id="btnSave" data-dismiss="modal">Save</button>\
						<button type="button" class="btn btn-default btnClose" data-dismiss="modal">Close</button>\
					</div>\
				</div>\
			</div>\
		<div class="modal-backdrop fade in"></div></div>');

	$(document.body).append(modalTemplate);
	modalTemplate
		.find('.btnClose')
		.one('click', function () {
			$('#modal_win').remove();
		})
		.end()
		.find('#btnSave').on('click', function () {
			var name = $('#name').val().trim();
			var threadID = $('#threadID').val();

			if (!name.length) {
				return alert('Name field can not be empty.');
			}

			$.ajax({
				type: "POST",
				url: '/Topics/AddTopic',
				data: {
					name: name
				},
				success: function (item) {
					var postCont = !item.NumPosts ? '<h5>No posts Yet</h5>' :
								'<h5><a>' + item.NickName + '</a></h5>\
								<small>Last post:' + (item.ThreadName ? "" : "Re: " + item.ThreadName) + '</small>\
								<small>Last posted on:'+ item.PostCreatedOn + '</small>\
								<br />';

					var addedItem =
						$('<li class= "span5 clearfix" >\
								<div class= "thumbnail clearfix" >\
									<input type="hidden" value="' + item.TopicID + '" />\
									<div class="caption" class="pull-left">\
											<div>\
												<a href="Topics/Details/' + item.TopicID + '" id="btnTopic" class="btn btn-primary icon  pull-right">Threads</a>\
											<h4>\
												<a>' + item.Name + '</a>\
											</h4>\
										</div>\
										<div class="text_block post_count">' + postCont + '</div>\
										<div class="text_block">\
											<a>Total replies: ' + (item.NumPosts || 0) + '</a>\
										</div>\
									</div>\
								</div>\
							</li >');

					$('#topic_cont').prepend(addedItem);
					$('#modal_win').remove();
				},
				error: function (xhr) {
					if (500 === xhr.status) {
						var message = JSON.parse(arguments[0].responseText).message;
						alert(message);
						$('#modal_win').remove();
					}
				},
				dataType: 'json'
			});
		});
});

$('#btnAddThread').on('click', function (e) {
	var modalTemplate =
		$('<div class="modal" id="modal_win" role = "dialog" >\
			<div class="modal-dialog">\
				<div class="modal-content">\
					<div class="modal-header">\
						<button type="button" class="close btnClose" data-dismiss="modal">&times;</button>\
						<h4 class="modal-title">Thread Details</h4>\
					</div>\
					<div class="modal-body">\
						<p>Name: </p><input id="name" type="text">\
					</div>\
					<div class="modal-body">\
						<p>Description: </p><textarea id="desc"></textarea>\
					</div>\
					<div class="modal-footer">\
						<button type="button" class="btn btn-default ok" id="btnSave" data-dismiss="modal">Save</button>\
						<button type="button" class="btn btn-default btnClose" data-dismiss="modal">Close</button>\
					</div>\
				</div>\
			</div>\
		<div class="modal-backdrop fade in"></div></div>');

	$(document.body).append(modalTemplate);

	modalTemplate
		.find('.btnClose')
		.one('click', function () {
			$('#modal_win').remove();
		})
		.end()
		.find('#btnSave').on('click', function () {
			var name = $('#name').val().trim();
			var desc = $('#desc').val().trim();
			var topicID = $('#topicID').val();

			if (!name.length) {
				return alert('Name field can not be empty.');
			}

			$.ajax({
				type: "POST",
				url: '/Threads/AddThread',
				data: {
					Name: name,
					Description: desc,
					TopicID: topicID
				},
				success: function (item) {
					var postCont = !item.NumPosts ? '<span>No posts Yet</span>' :
						'<span>Last posted by:</span>' + item.NickName + '<br />\
						<span>Last posted on: </span>' + item.PostCreatedOn + '\
								<br />';

					var addedItem =
						$('<li class="timeline-inverted">\
							<div class= "timeline-badge primary" > <a><i class="glyphicon glyphicon-record invert" rel="tooltip" title="11 hours ago via Twitter" id=""></i></a></div>\
									<div class="timeline-panel">\
										<div class="timeline-heading">\
										</div>\
										<div class="timeline-body">\
											<p>\
												<a href="/../Threads/Details/' + item.ThreadID + '">\
													' + item.Name + '\
											</a> <br />\
											<p>' + postCont + '</p>\
										</div>\
										<div class="timeline-footer">\
											<a>Total replies: ' + (item.NumPosts || 0) + '</a>\
											<a class="pull-right" href="/../Threads/Details/' + item.ThreadID + '">\
												Posts\
										<span class="glyphicon glyphicon-circle-arrow-right"></span>\
									</a>\
								</div>\
							</div>\
						</li>');

					$('.thread_cont').prepend(addedItem);
					$('#modal_win').remove();
				},
				error: function (xhr) {
					if (500 === xhr.status) {
						var message = JSON.parse(arguments[0].responseText).message;
						alert(message);
						$('#modal_win').remove();
					}
				},
				dataType: 'json'
			});
		});
});

$('#btnAddPost').on('click', function (e) {
	var modalTemplate =
		$('<div class="modal" id="modal_win" role = "dialog" >\
			<div class="modal-dialog">\
				<div class="modal-content">\
					<div class="modal-header">\
						<button type="button" class="close btnClose" data-dismiss="modal">&times;</button>\
						<h4 class="modal-title">Post Details</h4>\
					</div>\
					<div class="modal-body">\
						<p>Text: </p><textarea id="text"></textarea>\
					</div>\
					<div class="modal-footer">\
						<button type="button" class="btn btn-default ok" id="btnSave" data-dismiss="modal">Save</button>\
						<button type="button" class="btn btn-default btnClose" data-dismiss="modal">Close</button>\
					</div>\
				</div>\
			</div>\
		<div class="modal-backdrop fade in"></div></div>');

	$(document.body).append(modalTemplate);
	modalTemplate
		.find('.btnClose')
		.one('click', function () {
			$('#modal_win').remove();
		})
		.end()
		.find('#btnSave').on('click', function () {
			var desc = $('#text').val().trim();
			var threadID = $('#threadID').val();

			if (!desc.length) {
				return alert('Text field can not be empty.');
			}

			$.ajax({
				type: "POST",
				url: '/Posts/AddPost',
				data: {
					Text: desc,
					ThreadID: threadID
				},
				success: function (item) {
					var addedItem =
						$('<tr>\
							<td>\
							<div class="media">\
								<div class="media-body">\
									<p>Re: ' + threadName + '</p>\
									<p class="post_content">\
										' + item.Text + '<br/>\
									</p>\
									<p class="user_details">\
										<span>Poted By:</span>' + item.NickName + '<br/>\
										<span>Total posts: </span>' + item.NumPosts + '<br/>\
										<span>Registered:</span>' + item.UserCreated + '<br/>\
										<span>Country:</span>' + item.Country + '<br/>\
										<span>City:</span>' + item.City + '<br/>\
									</p>\
										<p class="commands">\
											<span id="btnEditPost" data-val="' + item.PostID + '" class="glyphicon glyphicon-edit"></span>\
											<span id="btnDeletePost" data-val="' + item.PostID + '" class="glyphicon glyphicon-remove"></span>\
										</p>\
									<p class="commands date">\
										<span>Posted on: ' + item.PostCreatedOn + '</span>\
									</p>\
								</div>\
							</div>\
						</td>\
					</tr>');

					$('.post_cont').prepend(addedItem);
					$('#modal_win').remove();
				},
				error: function (xhr) {
					if (500 === xhr.status) {
						var message = JSON.parse(arguments[0].responseText).message;
						alert(message);
						$('#modal_win').remove();
					}
				},
				dataType: 'json'
			});
		});
});

$('#btnSort').on('click', function (e) {
	var threadID = $('#threadID').val();

	$.ajax({
		type: "POST",
		url: '/Posts/GetCollectionJson',
		data: {
			ThreadID: threadID,
			sortorder: $('#btnSort').data('val')
		},
		success: function (items) {
			$('.post_cont').empty();
			$('#btnSort').data('val', ($('#btnSort').data('val') == 'ASC' ? 'DESC' : 'ASC'));

			var content = '';
			for (var i in items) {
				var commands = currentUserID ==
					items[i].UserID ? '<p class="commands">\
											<span id="btnEditPost" data-val="' + items[i].PostID + '" class="glyphicon glyphicon-edit"></span>\
											<span id="btnDeletePost" data-val="' + items[i].PostID + '" class="glyphicon glyphicon-remove"></span>\
										</p>' : '';

				var addedItem =
					'<tr>\
							<td>\
							<div class="media">\
								<div class="media-body">\
									<p>Re: ' + threadName + '</p>\
									<p class="post_content">\
										' + items[i].Text + '<br/>\
									</p>\
									<p class="user_details">\
										<span>Poted By:</span>' + items[i].NickName + '<br/>\
										<span>Total posts: </span>' + items[i].NumPosts + '<br/>\
										<span>Registered:</span>' + items[i].UserCreated + '<br/>\
										<span>Country:</span>' + items[i].Country + '<br/>\
										<span>City:</span>' + items[i].City + '<br/>\
									</p>' + commands +'<p class="commands date">\
										<span>Posted on: ' + items[i].PostCreated + '</span>\
									</p>\
								</div>\
							</div>\
						</td>\
					</tr>';
				content += addedItem;
			}

			$('.post_cont').append(content);
			$('#modal_win').remove();
		},
		error: function (xhr) {
			if (500 === xhr.status) {
				var message = JSON.parse(arguments[0].responseText).message;
				alert(message);
				$('#modal_win').remove();
			}
		},
		dataType: 'json'
	});
});

$(document.body).on('click', '.btnStopThread', function (e) {
	var button = $(e.currentTarget);
	$.ajax({
		type: "POST",
		url: '/Threads/CloseThread',
		data: {
			ThreadID: $(e.currentTarget).data('val')
		},
		success: function (item) {
			button.parent().append('<h5 class="inactive_thread">CLOSED<span title="Start Thread" data-val="' + item.ThreadID + '" class="btnStartThread glyphicon glyphicon-play-circle"></span></h5>');
			button.remove();
		},
		error: function (xhr) {
			if (500 === xhr.status) {
				var message = JSON.parse(arguments[0].responseText).message;
				alert(message);
				$('#modal_win').remove();
			}
		},
		dataType: 'json'
	});
});

$(document.body).on('click', '.btnStartThread', function (e) {
	var button = $(e.currentTarget);
	$.ajax({
		type: "POST",
		url: '/Threads/StartThread',
		data: {
			ThreadID: $(e.currentTarget).data('val')
		},
		success: function (item) {
			button.closest('.thread_header')
				.append($('<span title="Stop Thread" data-val="' + item.ThreadID + '" class="btnStopThread glyphicon glyphicon-off"></span>'));

			button
				.parent().empty();
		},
		error: function (xhr) {
			if (500 === xhr.status) {
				var message = JSON.parse(arguments[0].responseText).message;
				alert(message);
				$('#modal_win').remove();
			}
		},
		dataType: 'json'
	});
});

$(document.body).on('click', '#btnDeletePost', function (e) {
	var button = $(e.currentTarget);
	$.ajax({
		type: "POST",
		url: '/Posts/RemovePost',
		data: {
			PostID: button.data('val')
		},
		success: function (item) {
			button.closest('tr').remove();
		},
		error: function (xhr) {
			if (500 === xhr.status) {
				var message = JSON.parse(arguments[0].responseText).message;
				alert(message);
				$('#modal_win').remove();
			}
		},
		dataType: 'json'
	});
});

$(document.body).on('click', '#btnEditPost', function (e) {
	var button = $(e.currentTarget);
	var postID = button.data('val');
	var elem = button.parent().siblings('.post_content');
	var text = elem.text();
	elem.hide();
	elem.after('<textarea class="post_content" id="newText">' + text + '</textarea>');
	elem.siblings('.controls').hide();
	elem.siblings('.post_content').after($('<p title="Save changes" class="commands save_command"><span id = "btnSavePost" data-val="' + postID +'" class= "glyphicon glyphicon-floppy-saved"></span>\
		<span title="Cancel changes" id="btnCancelPost" class= "glyphicon glyphicon-remove-sign"></span></p>'));
});

$(document.body).on('click', '#btnSavePost', function (e) {
	var button = $(e.currentTarget);
	var postID = button.data('val');
	var text = $('#newText').val().trim();
	if (!text.length) {
		return alert('Text can not be empty.');
	}

	$.ajax({
		type: "POST",
		url: '/Posts/UpdatePost',
		data: {
			PostID: button.data('val'),
			Text: text
		},
		success: function (item) {
			$('#newText').remove();
			var postCont = button.parent().siblings('.post_content');
			postCont.text(item.Text).show();
			postCont.siblings('.save_command').remove();
			postCont.siblings('.commands.controls').show();
		},
		error: function (xhr) {
			if (500 === xhr.status) {
				var message = JSON.parse(arguments[0].responseText).message;
				alert(message);
				$('#modal_win').remove();
			}
		},
		dataType: 'json'
	});
});

$(document.body).on('click', '#btnCancelPost', function (e) {
	var button = $(e.currentTarget);
	var postCont = button.parent().siblings('.post_content');
	$('#newText').remove();
	postCont.show();
	postCont.siblings('.save_command').remove();
	postCont.siblings('.commands.controls').show();
});