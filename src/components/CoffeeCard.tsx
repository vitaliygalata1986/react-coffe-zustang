import { Card, Button, Tag, Rate } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { CoffeeType } from '../types/coffetypes';
import { useCoffeeStore } from '../model/coffeStore';

// Мы передаем объект { coffee }, значит, нужно типизировать его структуру
// То есть, явно указываем, что в props передается объект { coffee: CoffeeType }
function CoffeeCard({ coffee }: { coffee: CoffeeType }) {
  const { addToCart } = useCoffeeStore();
  return (
    <Card
      cover={<img alt={coffee.name} src={coffee.image} />}
      actions={[
        <Button
          onClick={() => addToCart(coffee)}
          icon={<ShoppingCartOutlined />}
        >
          {coffee.price}
        </Button>,
      ]}
    >
      <Card.Meta title={coffee.name} description={coffee.subTitle} />
      <Tag color='purple' style={{ marginTop: 12 }}>
        {coffee.type}
      </Tag>
      <Rate
        defaultValue={coffee.rating}
        disabled
        allowHalf
        style={{ marginTop: 12 }}
      />
    </Card>
  );
}

export default CoffeeCard;
