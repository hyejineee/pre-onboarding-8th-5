import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';

const { Meta } = Card;

type CommentPropsType = {
  profileUrl: string;
  author: string;
  content: string;
  createAt: string;
  onClickUpdate: () => void;
  onClickDelete: () => void;
};

export default function Comment({
  profileUrl,
  author,
  content,
  createAt,
  onClickUpdate,
  onClickDelete,
}: CommentPropsType) {
  return (
    <Card
      style={{ width: 400, margin: '16px' }}
      actions={[
        <EditOutlined key='edit' onClick={onClickUpdate} />,
        <DeleteOutlined key='ellipsis' onClick={onClickDelete} />,
      ]}
    >
      <Meta
        avatar={<Avatar src={profileUrl} />}
        title={author}
        description={createAt}
      />
      <p>{content}</p>
    </Card>
  );
}
