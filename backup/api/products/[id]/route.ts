import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

// Define the correct context type for Next.js 15
type Context = {
  params: {
    id: string;
  }
};

export async function GET(
  request: NextRequest,
  context: Context
) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: context.params.id,
      },
      include: {
        category: true,
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
      },
    });
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    return NextResponse.json(product);
  } catch  {
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  context: Context
) {
  try {
    const body = await request.json();
    const { name, description, price, images, categoryId, stock } = body;
    
    const product = await prisma.product.update({
      where: {
        id: context.params.id,
      },
      data: {
        name,
        description,
        price: parseFloat(price),
        images,
        categoryId,
        stock: parseInt(stock),
      },
    });
    
    return NextResponse.json(product);
  } catch  {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: Context
) {
  try {
    await prisma.product.delete({
      where: {
        id: context.params.id,
      },
    });
    
    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch  {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}