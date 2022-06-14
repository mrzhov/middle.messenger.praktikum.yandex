import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Link } from '@/components/link';
import { AuthLayout } from '@/layouts/auth';
import { registerComponent } from '@/shared/core';

export default () => {
	registerComponent(Button);
	registerComponent(Link);
	registerComponent(Input);
	registerComponent(AuthLayout);
};
