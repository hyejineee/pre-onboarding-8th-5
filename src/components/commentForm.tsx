import { Button, Input } from 'antd';
import {
  useCreateComment,
  useUpdateComment,
  useUpdatedComment,
} from 'commons/contexts/commentContext';
import CommentType from 'commons/types/comment.types';
import { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';

const { TextArea } = Input;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 8px 0;
`;

const getCurrentDay = () => new Date().toISOString().slice(0, 10);

export default function CommentForm() {
  const updatedComment = useUpdatedComment();
  const createComment = useCreateComment();
  const updateComment = useUpdateComment();

  const [comment, setComment] = useState({
    author: '',
    content: '',
  });

  const resetInput = () => {
    setComment({ author: '', content: '' });
  };

  const handleClick = () => {
    const profileUrl = `https://picsum.photos/id/${Math.floor(
      Math.random() * 80,
    )}/50/50`;

    resetInput();

    if (updatedComment) {
      const updated = {
        ...updatedComment,
        ...comment,
      };

      updateComment(updatedComment.id || -1, updated);
      return;
    }

    const newComment: Omit<CommentType, 'id'> = {
      profile_url: profileUrl,
      ...comment,
      createdAt: getCurrentDay(),
    };
    createComment(newComment);
  };

  const handleChangeInputs =
    (type: string) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setComment(p => ({
        ...p,
        [type]: e.target.value,
      }));
    };

  useEffect(() => {
    if (!updatedComment) return;
    setComment({
      author: updatedComment.author,
      content: updatedComment.content,
    });
  }, [updatedComment]);

  return (
    <Wrapper>
      <Input
        showCount
        maxLength={20}
        placeholder='작성자'
        value={comment.author}
        onChange={handleChangeInputs('author')}
      />

      <TextArea
        showCount
        maxLength={100}
        placeholder='내용을 입력해 주세요.'
        value={comment.content}
        onChange={handleChangeInputs('content')}
        style={{ height: 80, resize: 'none', marginBottom: '16px' }}
      />

      <Button type='primary' onClick={handleClick}>
        {updatedComment ? '수정' : '등록'}
      </Button>
    </Wrapper>
  );
}
